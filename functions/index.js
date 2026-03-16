const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const { verifyToken } = require("@clerk/backend");

const clerkSecretKey = defineSecret("CLERK_SECRET_KEY");

if (!admin.apps.length) {
  admin.initializeApp();
}

exports.firebaseCustomToken = onRequest(
  {
    cors: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      /https:\/\/.*\.netlify\.app$/,
    ],
    secrets: [clerkSecretKey],
  },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed." });
      return;
    }

    try {
      const authorization = req.get("authorization");

      if (!authorization?.startsWith("Bearer ")) {
        res.status(401).json({ error: "Missing Clerk session token." });
        return;
      }

      const clerkSessionToken = authorization.slice("Bearer ".length);
      const claims = await verifyToken(clerkSessionToken, {
        secretKey: clerkSecretKey.value(),
      });
      const firebaseToken = await admin.auth().createCustomToken(claims.sub, {
        email:
          claims.email ||
          claims.email_address ||
          claims.primary_email_address ||
          null,
      });

      res.status(200).json({ firebaseToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

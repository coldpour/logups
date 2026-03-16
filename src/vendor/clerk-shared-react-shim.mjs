import React from "react";
import * as sharedReact from "../../node_modules/@clerk/shared/dist/runtime/react/index.mjs";

const ClientContext = React.createContext(null);
const SessionContext = React.createContext(null);
const UserContext = React.createContext(null);
const OrganizationContext = React.createContext(null);

const useClientContext = () =>
  React.useContext(ClientContext) ?? sharedReact.useClerk().client;
const useSessionContext = () => sharedReact.useSession().session;
const useUserContext = () =>
  React.useContext(UserContext) ?? sharedReact.useUser().user;
const useOrganizationContext = () =>
  React.useContext(OrganizationContext) ??
  sharedReact.useOrganization().organization;

const OrganizationProvider = ({ children, ...value }) =>
  React.createElement(OrganizationContext.Provider, { value }, children);

export * from "../../node_modules/@clerk/shared/dist/runtime/react/index.mjs";
export {
  ClientContext,
  OrganizationContext,
  OrganizationProvider,
  SessionContext,
  UserContext,
  useClientContext,
  useOrganizationContext,
  useSessionContext,
  useUserContext,
};

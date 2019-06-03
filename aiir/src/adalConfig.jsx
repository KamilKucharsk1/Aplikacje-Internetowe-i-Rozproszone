import { AdalConfig, AuthenticationContext } from "react-adal";
// Endpoint URL
export const endpoint = "https://<tenant name>.sharepoint.com/";
// App Registration ID
const appId = "f0b90224-6dd7-4364-862b-d584ff65f6f3";
export const adalConfig: AdalConfig = {
  cacheLocation: "localStorage",
  clientId: appId,
  endpoints: {
    api: endpoint
  },
  postLogoutRedirectUri: window.location.origin,
  tenant: "politechnikawroclawska.onmicrosoft.com"
};
export const authContext = new AuthenticationContext(adalConfig);

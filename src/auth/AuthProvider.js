import { Auth0Provider } from "@auth0/auth0-react";

const AuthProvider = ({ children }) => {
  
  return (
    <Auth0Provider
      domain="dev-e6tkv2b8tbmr4k5m.us.auth0.com"
      clientId="0TpwMvG8WUTvHN5PcPZPHA9kz5ZaUi6x"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://my-app-backend-gkce.onrender.com/api",
        scope: "openid profile email"
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
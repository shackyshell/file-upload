import { Auth0Provider } from '@auth0/auth0-react'
import AppAuthorized from './AppAuthorized'

function App() {

  // const onRedirectCallback = (appState: any) => {
  //     console.log('jul', appState?.returnTo)
  //   // navigate(appState?.returnTo || window.location.pathname);
  // };

            const providerConfig = {
              domain: import.meta.env.VITE_DOMAIN,
              clientId: import.meta.env.VITE_CLIENT_ID,
              authorizationParams: {
                redirect_uri: window.location.origin,
                audience: import.meta.env.VITE_AUDIENCE,
              },
              // onRedirectCallback: onRedirectCallback,
            }
  
  return (
    <Auth0Provider {...providerConfig}>
      <AppAuthorized />
    </Auth0Provider>
  )
}

export default App

import { useEffect, useState } from 'react'
import './App.css'
import FileUpload from './components/file-upload/FileUpload'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

function Component() {
  const { getAccessTokenSilently } = useAuth0()
  const [token, setToken] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            redirect_uri: window.location.origin,
            audience: import.meta.env.VITE_AUDIENCE,
          },
        })
        setToken(token)
        console.log('token', token)
      } catch (e) {
        // Handle errors such as `login_required` and `consent_required` by re-prompting for a login
        console.error(e)
      }
    })()
  }, [getAccessTokenSilently])

  return (
    <>
      <h1>Vite + React</h1>
      <FileUpload token={token} />
    </>
  )
}

const AppAuthorized = withAuthenticationRequired(Component, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
})
export default AppAuthorized

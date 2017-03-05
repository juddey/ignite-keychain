/* Hello! Welcome to the sample functions for ignite-keychain.
This file provides functions to store credentials for an external
authentication server - a very common use case.

Futher functions available in the keychain readme:
https://github.com/oblador/react-native-keychain

Thanx @oblador!
*/
import * as Keychain from 'react-native-keychain'

export default class IgniteKeychain {

  // This function stores the credentials you got from
  // the authentication server. Parameters are examples.
  // url: The site youre authenticating against.
  // client: a client ID (you might not always have this)
  // token: the access token
  // uid: the autentication server's user ID for this user (if any)
  // expiry: When the token expires. Assumes integer representation.

  storeAuth (url, client, token, uid, expiry) {
    let out = [client, token, expiry].join()
    Keychain.setInternetCredentials(url, uid, out).then(function () {
      return { ok: true, error: null }
    }).catch(function () {
      return { ok: false, error: 'Failed to get credentials!' }
    })
  }

  // Retrieves the credentials from the keychain
  // that you stored in storeAuth. You might want
  // to call this function when you're about to
  // interact with your API endpoint.

  fetchAuth (url) {
     Keychain
      .getInternetCredentials(url)
      .then(function (credentials) {
        // You might want to parse the credentials that you get
        // out of the keychain here before returning them.
        return credentials
      }).catch(function () {
        return { error: 'Failed to get credentials!' }
      })
  }

  // Removes the credentials from the keychain.
  // Use this when a user logs out or deregisters
  // from your service.

  deleteAuth (url) {
    Keychain
      .resetInternetCredentials(url)
      .then(function () {
        return { ok: true, error: null }
      })
      .catch((error) => {
        return { ok: false, error: error }
      })
  }
}

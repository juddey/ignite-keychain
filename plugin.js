// Ignite plugin for React Native Keychain
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = 'react-native-keychain'
const PLUGIN_PATH = '/home/justin/projects/react-native/ignite-keychain' // __dirname
const APP_PATH = process.cwd()

const add = async function (context) {
  const { ignite, filesystem } = context

  // install a npm module and link it
  await ignite.addModule(NPM_MODULE_NAME, { link: true })

  // Copy the example Keychain js file.
  if (!filesystem.exists(`${APP_PATH}/App/Services/Keychain.js`)) {
    filesystem.copy(`${PLUGIN_PATH}/templates/Keychain.js`, `${APP_PATH}/App/Services/Keychain.js`)
  }

  // Import the Keychain file somewhere useful (say, when logging in.)
  if (filesystem.exists(`${APP_PATH}/App/Sagas/LoginSagas.js`)) {
    ignite.patchInFile(`${APP_PATH}/App/Sagas/LoginSagas.js`, {
      insert: `import { storeAuth } from '../Services/Keychain'`,
      before: `import LoginActions from '../Redux/LoginRedux'`
    })
  }
}
/**
 * Remove yourself from the project.
 */
const remove = async function (context) {
  const { ignite, filesystem } = context

  // remove the npm module and unlink it
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: true })

  // Remove the Keychain Boilerplate.
  const removeKeychain = await context.prompt.confirm(
    'Do you want to remove the Ignite Keychain boilerplate?'
  )
  if (removeKeychain) {
    // Remove the Keychain Example file.
    filesystem.remove(`${APP_PATH}/App/Services/Keychain.js`)
    // Remove the patch from LoginSaga.
    if (filesystem.exists(`${APP_PATH}/App/Sagas/LoginSagas.js`)) {
      ignite.patchInFile(`${APP_PATH}/App/Sagas/LoginSagas.js`, {
        delete: `import { storeAuth } from '../Services/Keychain'\n`
      })
    }
  }
}

// Required in all Ignite plugins
module.exports = { add, remove }

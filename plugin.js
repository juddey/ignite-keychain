// Ignite plugin for React Native Keychain
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = 'react-native-keychain'
const PLUGIN_PATH = __dirname
const APP_PATH = process.cwd()
const EXAMPLE_FILE = 'KeychainComponentExample.js'

const add = async function (context) {
  const { ignite, filesystem } = context

  // install a npm module and link it
  await ignite.addModule(NPM_MODULE_NAME, { link: true })

  // Copy the service Keychain js file.
  if (!filesystem.exists(`${APP_PATH}/App/Services/Keychain.js`)) {
    filesystem.copy(
      `${PLUGIN_PATH}/templates/Keychain.js`,
      `${APP_PATH}/App/Services/Keychain.js`
    )
  }

  // copy the component example file (if examples are turned on)
  await ignite.addPluginComponentExample(EXAMPLE_FILE, { title: 'Keychain Example' })

  // Import the Keychain file somewhere useful (say, when starting the app.)
  // Also add an commented example.
  if (filesystem.exists(`${APP_PATH}/App/Sagas/StartupSagas.js`)) {
    ignite.patchInFile(`${APP_PATH}/App/Sagas/StartupSagas.js`, {
      insert: `import { fetchAuth } from '../Services/Keychain'`,
      after: `import { is } from 'ramda'`
    })
    ignite.patchInFile(`${APP_PATH}/App/Sagas/StartupSagas.js`, {
      insert: `// const auth = yield call(fetchAuth, 'https://your.cool.url')`,
      after: 'export function'
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

    // remove the component example
    await ignite.removePluginComponentExample(EXAMPLE_FILE)

    // Remove the Keychain service file.
    filesystem.remove(`${APP_PATH}/App/Services/Keychain.js`)
    // Remove the patch from LoginSaga.
    if (filesystem.exists(`${APP_PATH}/App/Sagas/StartupSagas.js`)) {
      ignite.patchInFile(`${APP_PATH}/App/Sagas/StartupSagas.js`, {
        delete: `import { fetchAuth } from '../Services/Keychain'\n`
      })
      ignite.patchInFile(`${APP_PATH}/App/Sagas/StartupSagas.js`, {
        delete: `// const auth = yield call(fetchAuth, 'https://your.cool.url')\n`
      })
    }
  }
}

// Required in all Ignite plugins
module.exports = { add, remove }

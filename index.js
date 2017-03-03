// Ignite plugin for React Native Keychain
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = 'react-native-keychain'
// const PLUGIN_PATH = __dirname
// const APP_PATH = process.cwd()


const add = async function (context) {
  const { ignite, filesystem } = context

  // install a npm module and link it
  await ignite.addModule(NPM_MODULE_NAME, { link: true })



  // Example of copying templates/Keychain to App/Keychain
  // if (!filesystem.exists(`${APP_PATH}/App/Keychain`)) {
  //   filesystem.copy(`${PLUGIN_PATH}/templates/Keychain`, `${APP_PATH}/App/Keychain`)
  // }

  // Example of patching a file
  // ignite.patchInFile(`${APP_PATH}/App/Config/AppConfig.js`, {
  //   insert: `import '../Keychain/Keychain'\n`,
  //   before: `export default {`
  // })
}

/**
 * Remove yourself from the project.
 */
const remove = async function (context) {
  const { ignite, filesystem } = context

  // remove the npm module and unlink it
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: true })



  // Example of removing App/Keychain folder
  // const removeKeychain = await context.prompt.confirm(
  //   'Do you want to remove App/Keychain?'
  // )
  // if (removeKeychain) { filesystem.remove(`${APP_PATH}/App/Keychain`) }

  // Example of unpatching a file
  // ignite.patchInFile(`${APP_PATH}/App/Config/AppConfig.js`, {
  //   insert: '',
  //   replace: `import '../Keychain/Keychain'\n`
  // )
}

// Required in all Ignite plugins
module.exports = { add, remove }

const test = require('ava')
const sinon = require('sinon')
const plugin = require('../index')

test('removes Keychain', async t => {
  const removeModule = sinon.spy()
  const removePluginComponentExample = sinon.spy()

  const context = {
    ignite: { removeModule, removePluginComponentExample }
  }

  await plugin.remove(context)

  t.true(removeModule.calledWith('react-native-keychain', { unlink: true }))
  t.true(removePluginComponentExample.calledWith('KeychainExample.js'))
})

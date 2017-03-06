const test = require('ava')
const sinon = require('sinon')
const plugin = require('../plugin')




test('removes Keychain and sample code', async t => {
  const removeModule = sinon.spy()
  const confirm = sinon.stub().returns(true)
  const remove = sinon.spy()
  const patchInFile = sinon.spy()
  const exists = sinon.stub().returns(true)

  const context = {
    ignite: { removeModule, patchInFile },
    filesystem: { exists, remove },
    prompt: { confirm }
  }

  await plugin.remove(context)

  t.true(removeModule.calledWith('react-native-keychain', { unlink: true }))
  t.true(confirm.called)
  t.true(remove.called)
  t.true(patchInFile.called)
  t.is(remove.args[0][0], `${process.cwd()}/App/Services/Keychain.js`)
  t.is(patchInFile.args[0][0], `${process.cwd()}/App/Sagas/LoginSagas.js`)
  t.is(patchInFile.args[0][1].delete, "import { storeAuth } from \'../Services/Keychain\'\n")
})


test('removes Keychain Module, but leaves sample code intact', async t => {
  const removeModule = sinon.spy()
  const confirm = sinon.stub().returns(false)
  const remove = sinon.spy()
  const patchInFile = sinon.spy()
  const exists = sinon.spy()

  const context = {
    ignite: { removeModule, patchInFile },
    filesystem: { exists, remove },
    prompt: { confirm }
  }

  await plugin.remove(context)

  t.true(removeModule.calledWith('react-native-keychain', { unlink: true }))
  t.true(confirm.called)
  t.true(remove.notCalled)
  t.true(patchInFile.notCalled)
  t.true(exists.notCalled)
})

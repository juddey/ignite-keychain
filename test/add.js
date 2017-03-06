const test = require('ava')
const sinon = require('sinon')
const plugin = require('../plugin')

test('adds the proper npm module, copies file, and does not add to StartupSaga ', async t => {
  // spy on few things so we know they're called
  const addModule = sinon.spy()
  const addPluginComponentExample = sinon.spy()
  const exists = sinon.stub().returns(false)
  const patchInFile = sinon.spy()
  const copy = sinon.spy()

  // mock a context
  const context = {
    ignite: { addModule, addPluginComponentExample, patchInFile },
    filesystem: { exists, copy }
  }
  await plugin.add(context)

  // Check for some results.
  t.true(addModule.calledWith('react-native-keychain', { link: true }))
  t.true(exists.calledTwice)
  t.true(copy.called)
  t.true(patchInFile.notCalled)
})

test('adds the proper npm module, does not copy file, and adds to StartupSaga ', async t => {
  // spy on few things so we know they're called
  const addModule = sinon.spy()
  const addPluginComponentExample = sinon.spy()
  const exists = sinon.stub().returns(true)
  const patchInFile = sinon.spy()
  const copy = sinon.spy()

  // mock a context
  const context = {
    ignite: { addModule, addPluginComponentExample, patchInFile },
    filesystem: { exists, copy }
  }
  await plugin.add(context)

  // Check for some results.
  t.true(addModule.calledWith('react-native-keychain', { link: true }))
  t.true(exists.calledTwice)
  t.true(copy.notCalled)
  t.true(patchInFile.calledTwice)
})

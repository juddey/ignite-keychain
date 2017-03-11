// @flow

import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import ExamplesRegistry from '../../../App/Services/ExamplesRegistry'
import * as Keychain from 'react-native-keychain'

const username = 'nachos'
const password = 'tacos'

const readStoredStuff = () => Keychain
  .getGenericPassword()
  .then((credentials) => {
    window.alert(`Credentials successfully loaded.  Keychain returned Username: ${credentials.username} Password: ${credentials.password}`)
  }).catch((error) => {
    window.alert('Keychain couldn\'t be accessed! Maybe no value set?')
  })

const storeStuff = (username, password) => Keychain
  .setGenericPassword(username, password)
  .then(() => {
    window.alert('Credentials saved successfully! Username: Nachos, Password: Tacos')
  })

const deleteStuff = () => Keychain
  .resetGenericPassword()
  .then(function() {
    window.alert('Credentials successfully deleted');
  });

// Example
ExamplesRegistry.addPluginExample('Keychain', () =>
  <View style={{flexDirection: 'row'}}>
    <TouchableOpacity onPress={() => storeStuff(username, password)}>
      <Text style={{color: 'white', padding: 10}}>Tap to Store</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={readStoredStuff}>
      <Text style={{color: 'white', padding: 10}}>Tap to Read</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={deleteStuff}>
      <Text style={{color: 'white', padding: 10}}>Tap to Clear</Text>
    </TouchableOpacity>
  </View>
)

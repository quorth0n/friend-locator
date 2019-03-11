import React from 'react';
import { View } from 'react-native';
import Dialog from 'react-native-dialog';

export default () => (
  <View>
    <Dialog.Container visible={this.state.dialogVisible}>
      <Dialog.Title>Family name</Dialog.Title>
      <Dialog.Description>
        Please enter a name for the family
      </Dialog.Description>
      <Dialog.Input />
      <Dialog.Button label="Cancel" onPress={this.handleCancel} />
      <Dialog.Button label="Confirm" onPress={this.handleConfirm} />
    </Dialog.Container>
  </View>
);

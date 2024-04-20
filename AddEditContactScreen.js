import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddEditContactScreen = ({ navigation, route }) => {
  const { mode, contact } = route.params;
  const [name, setName] = useState(contact ? contact.name : '');
  const [phone, setPhone] = useState(contact ? contact.phone : '');
  const [countryCode, setCountryCode] = useState(contact ? contact.countryCode : '');
  const [note, setNote] = useState(contact ? contact.note : '');

  const saveContact = async () => {
    if (!name || !phone || !countryCode) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return; // Do not save if any required field is missing
    }

    if (!/^\d{10}$/.test(phone)) {
      Alert.alert('Invalid Phone Number', 'Please enter a 10-digit phone number.');
      return; // Do not save if phone number is not 10 digits
    }

    const updatedContact = {
      id: contact ? contact.id : Math.random().toString(), // Generate a unique ID if not provided
      name,
      phone,
      countryCode,
      note,
    };

    try {
      let existingContacts = [];
      const contactsJSON = await AsyncStorage.getItem('contacts');
      
      if (contactsJSON) {
        existingContacts = JSON.parse(contactsJSON);
        if (!Array.isArray(existingContacts)) {
          console.error('Existing contacts is not an array:', existingContacts);
          return;
        }
      }

      let updatedContacts;

      if (mode === 'edit') {
        updatedContacts = existingContacts.map(c => (c.id === contact.id ? updatedContact : c));
      } else {
        updatedContacts = [...existingContacts, updatedContact];
      }

      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));

      console.log('Contact saved successfully:', updatedContact);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving contact:', error);
      Alert.alert('Error', 'Failed to save contact. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Name"
        />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="numeric"
          placeholder="Phone"
          maxLength={10} // Set max length to 10 digits
        />
        <TextInput
          value={countryCode}
          onChangeText={setCountryCode}
          style={styles.input}
          keyboardType="numeric"
          placeholder="Country Code"
          maxLength={3} // Set max length to 3 digits
        />
        <TextInput
          value={note}
          onChangeText={setNote}
          style={styles.input}
          placeholder="Note"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Save"
          onPress={saveContact}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default AddEditContactScreen;
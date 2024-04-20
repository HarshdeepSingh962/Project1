import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const contactsJSON = await AsyncStorage.getItem('contacts');
      if (contactsJSON) {
        setContacts(JSON.parse(contactsJSON));
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const updatedContacts = contacts.filter(contact => contact.id !== id);
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
      setContacts(updatedContacts);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: 'lightgray' }}>
      <View style={{ flex: 1 }}>
        <Text>{item.countryCode} {item.phone}</Text>
        <Text>{item.name}</Text>
        <Text style={{ fontStyle: 'italic' }}>{item.note}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button title="Edit" onPress={() => navigation.navigate('AddEditContact', { mode: 'edit', contact: item })} />
        <Button title="Delete" onPress={() => handleDeleteContact(item.id)} />
      </View>
    </View>
  );

  const refreshContacts = () => {
    fetchContacts();
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Contacts</Text>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id ? item.id.toString() : ''}
        ListEmptyComponent={<Text>No contacts found</Text>}
      />
      <View style={{ marginVertical: 10 }}>
        <Button title="Add Contact" onPress={() => navigation.navigate('AddEditContact', { mode: 'add' })} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="Refresh" onPress={refreshContacts} />
      </View>
    </View>
  );
};

export default HomeScreen;
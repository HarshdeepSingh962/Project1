Contacts Management App

This is a simple contacts management mobile application built using React Native. It allows users to manage their contacts by adding, editing, and deleting contacts. Contacts are stored locally on the device using AsyncStorage.

Features

View a list of contacts with name, phone number, country code, and notes.
Add new contacts by providing name, phone number, country code, and optional notes.
Edit existing contacts to update their information.
Delete contacts from the list.
Refresh the contact list to fetch the latest changes.

Screens
Home Screen
The home screen displays a list of contacts. Each contact entry includes the name, phone number, country code, and notes. Users can perform the following actions from this screen:

Add a new contact

Edit an existing contact

Delete a contact

Refresh the contact list to fetch the latest changes

Add/Edit Contact Screen
This screen allows users to add a new contact or edit an existing one. Users can provide the following information for each contact:

Name
Phone number
Country code
Notes (optional)
Installation

To run the app locally and build the APK, follow these steps:

Clone this repository to your local machine.

Navigate to the project directory in your terminal.

Install Node.js and npm if you haven't already.

Install Expo CLI globally by running:
npm install -g expo-cli

Install project dependencies by running:
npm install

Start the development server by running:
expo start

Follow the prompts to build the APK:
Select the desired build option (e.g., Android).
Provide necessary configurations for the build.
Wait for the build to complete.
Once the build is complete, download the APK from the provided link.

Dependencies
The app relies on the following libraries and dependencies:

@react-native-async-storage/async-storage: For storing contacts locally.
@react-native-picker/picker: For selecting country codes.
@react-navigation/native and @react-navigation/stack: For navigation between screens.
expo: For development and building.
expo-status-bar: For a consistent status bar across platforms.
react and react-native: Core libraries for building React Native apps.
react-native-gesture-handler: For gesture handling.
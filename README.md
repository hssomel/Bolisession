# BoliSession App Project Directory

## Quick Overview About BoliSession App Usage and Functionality
Goal: Create a social media app for the Southeast Asian dance community (i.e. Bhangra community) which allows users and existing dance teams to connect with each other and have a public platform to discuss all the recent developments in the dance community. This app will allow teams (university, professional-gig, etc.) to fill empty roles quickly by viewing profiles of local users in which users have the ability to showcase their talent in the form of a profile background video.

### App Features: 
- User and Team account type. (Each with their own set of features).
- Live social media feed similar to twitter 
- Direct messaging capability 
- Profile creation similar to twitter but with added 'background profile video' feature
- Maps feature to broadcast your location to other users in the community

### Upcoming features:
- Creation of a Competition account type to allow Teams to directly apply to competitions


### Tech Stack:
Originally BoliSession was going to be a web application built on the MERN stack. That is no longer the case.
BoliSession is a mobile application built using: 
- React Native 
- React Navigation for routing (creating screens)
- Firebase (for Authentication, Database, Storage, and fetching Data)
- Redux (Redux has been setup but it will be implemented as the app grows larger)

### Installation (Android Only - still configuring CocoaPods for iOS)
In Client directory run "npm install" in terminal to install all dependencies and run "npm run android".

### Entry Point and Directories
Entry point of application is 'App.js'
App.js shows the different navigators used to construct the routes for the app.

- All the screens are located under 'client/src/screens' (14 total different screens)

###### Authentication Screens (If user has not created an account)
- LandingPageScreen.js
- PhoneNumberScreen.js
- PhoneConfirmationScreen.js

###### Initial Profile Construction Screens (Mandatory user has a username and profile picture)
- CreateAccountScreen.js (for username and team affiliation)
- ProfilePhotoScreen.js
- AccountTypeScreen.js

### Main App Stacks ( Home, Map, Message )
##### Home Stack
- HomeScreen.js          (entry screen for the HomeStack. contains twitter like posts feed)
- UserProfileScreen.js   (profile screen of client or of other user)
- SettingsScreen.js      (allows user to sign out or delete their account)
- UserBioScreen.js       (allows user to edit their bio)
- SetUpProfileVideo.js   (allows user to set up profile background video)

##### MapStack
- MapScreen.js (contains the map feature. allows user to enable/disable location and navigate to other users profiles)

##### Message Stack
- MessagingListScreen.js  (a list of all users on the app)
- PrivateMessageScreen.js (the private messaging screen between two users)

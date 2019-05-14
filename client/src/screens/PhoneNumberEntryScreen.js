// import React, { useState } from 'react';
// import { View, StyleSheet, SafeAreaView } from 'react-native';

// import { Input, Text, Button, Icon } from 'react-native-elements';

// const PhoneNumberEntryScreen = props => {
//   // Feed Initial State
//   const [spinner, setSpinner] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState('');

//   // Event Handlers
//   const handlePhoneNumberChange = value => setPhoneNumber(value);
//   const handleSubmitPress = () => props.navigation.navigate('phCodeVerify');

//   // Set Keyboard Type
//   return (
//     <View style={styles.container}>
//       <SafeAreaView
//         style={{
//           flex: 1,
//         }}
//       >
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: 'white',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'grey',
//           }}
//         >
//           <View
//             style={{
//               flex: 2,
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: 'green',
//               width: '100%',
//             }}
//           >
//             <Text h4>What's your phone number?</Text>
//           </View>
//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: 'yellow',
//               width: '85%',
//             }}
//           >
//             <View
//               style={{
//                 flex: 1,
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: 'white',
//               }}
//             >
//               <Text h3 style={{ alignItems: 'flex-start' }}>
//                 +
//               </Text>
//             </View>
//             <View
//               style={{
//                 flex: 1.5,
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: 'white',
//               }}
//             >
//               <Input inputStyle={{ alignItems: 'center' }} placeholder="1" />
//             </View>
//             <View
//               style={{
//                 flex: 5,
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: 'white',
//               }}
//             >
//               <Input placeholder="" />
//             </View>
//           </View>
//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: 'green',
//             }}
//           >
//             <Button title="Send confirmation code" />
//           </View>
//         </View>
//         <View style={{ flex: 1, backgroundColor: 'red' }} />
//       </SafeAreaView>
//     </View>
//   );
// };

// export default PhoneNumberEntryScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // height: '100%',
//     // width: '100%',
//     // flexDirection: 'column',
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   titleText: {},
// });

// // return (
// //   <View style={styles.container}>
// //     <Text style={styles.header}>What's your phone number?</Text>

// //     <TextInput
// //       onChange={handlePhoneNumberChange}
// //       keyboardType="phone-pad"
// //       autoFocus
// //       style={styles.textInput}
// //       placeholder="Phone Number"
// //       placeholderTextColor={brandColor}
// //       selectionColor={brandColor}

// //       // //underlineColorAndroid={'transparent'}
// //       // autoCapitalize={'none'}
// //       // autoCorrect={false}

// //       // returnKeyType="go"
// //     />

// //     <TouchableOpacity style={styles.button} onPress={handleSubmitPress}>
// //       <Text style={styles.buttonText}>Send confirmation code</Text>
// //     </TouchableOpacity>

// //     <Text style={styles.disclaimerText}>
// //       By tapping "Send confirmation code" above, we will send you an SMS to
// //       confirm your phone number. Message &amp; data rates may apply.
// //     </Text>
// //   </View>
// // );

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     height: '100%',
// //     width: '100%',
// //     flexDirection: 'column',
// //     justifyContent: 'flex-start',
// //     alignItems: 'center',
// //   },
// //   header: {
// //     textAlign: 'center',
// //     marginTop: '8%',
// //     fontSize: 26,
// //     color: '#4A4A4A',
// //   },
// //   buttonText: {
// //     color: 'white',
// //     textAlign: 'center',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   textInput: {
// //     flexDirection: 'column',
// //     justifyContent: 'flex-start',
// //     alignItems: 'center',
// //     marginTop: '10%',
// //     width: '100%',
// //     height: 60,
// //     fontSize: 26,
// //     padding: 0,
// //     margin: 0,
// //   },
// //   disclaimerText: {
// //     marginTop: '8%',
// //     marginLeft: '5%',
// //     marginRight: '5%',
// //     fontSize: 12,
// //     color: 'grey',
// //   },
// //   button: {
// //     marginTop: '12%',
// //     width: '80%',
// //     backgroundColor: 'orangered',
// //     alignItems: 'center',
// //     borderRadius: 32,
// //     paddingVertical: 11,
// //   },
// // });

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import Main from './Main';
import Photo from './Photo';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';
import axios from 'axios';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import { Button } from 'native-base';
import ImagePicker from 'react-native-image-picker'
// Axios = () => {
//   axios.get("https://jsonplaceholder.typicode.com/users")
//       .then(response => {
//           console.log('getting data from axios', response.data);
//           setTimeout(() => {
//               this.setState({
//                   loading: false,
//                   axiosData: response.data
//               })
//           }, 2000)
//       })
//       .catch(error => {
//           console.log(error);
//       });
// }

function handleUploadImage() {
    axios.post(`http://f6043df3.ngrok.io/send`, { 
      latitude:0,
      longitude:1
     })
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
    console.log('Hi')

}

const App = () => {
  return (
    <View>
      <Text>Post request</Text>
      {/* <Main /> */}
      {/* <Button title={'Click me to send data'} onPress={handleUploadImage()}></Button> */}
     <Photo />
     </View>
  );
};


export default App;

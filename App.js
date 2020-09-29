/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import Main from './Main';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Button } from 'native-base';

// Yeh Axios mera latitude and longitude bhejega Flask Ko
function handleUploadImage() {
  // Yeh neeche jo link hai woh mera flask server hai
    axios.post(`http://cfcfc800.ngrok.io/send`, { 
      // Yaha tera values aayega using geofencing
      latitude:0,
      longitude:1,
      image_uri:'Yaha tera base 64 waala uri ayega adi'
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
      <Button title={'Click me to send data'} onPress={handleUploadImage()}></Button>

    </View>
  );
};


export default App;

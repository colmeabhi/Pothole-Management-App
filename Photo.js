import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import ImagePicker from 'react-native-image-picker'

class Photo extends React.Component {
  state = {
    photo: null,
  }

  handleChoosePhoto = () => {
      console.log("Hi")
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  render() {
    const { photo } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* {photo && (
        //   <Image
        //     source={{ uri: photo.uri }}
        //     style={{ width: 300, height: 300 }}
        //   />
        )} */}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        {/* <Text>Hello</Text> */}
      </View>
    )
  }
}

export default Photo;
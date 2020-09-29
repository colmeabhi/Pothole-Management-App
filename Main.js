
import React from 'react';
import { Container, Content, Form, Item, Label,Input,FileInput } from 'native-base';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Image,
  TextInput,
  // FileInput
} from 'react-native';
class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      });
    });
  }

  render() {
    return (
        <Form onSubmit={this.handleUploadImage}>
        <View>
          {/* <FileInput ref={(ref) => { this.uploadInput = ref; }} /> */}
          {/* <Text>Hi</Text> */}
        </View>
        <View>
          <TextInput ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </View>
        <View>
          <Button title="Upload"></Button>
        </View>
        {/* <Image source={this.state.imageURL}/> */}
      </Form>
    );
  }
}

export default Main;
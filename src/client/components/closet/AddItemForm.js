import React, {useState, Component} from 'react';
import { StyleSheet, Image, Text, View, TextInput, Platform, Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import { Button, Collection, SegmentedControl, RowItem, TabBar, TextField} from 'react-native-ios-kit';
import data from '../../data.json'
import { Card, ListItem, Container } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
export const imgs = [];

export default class AddItemForm extends Component {


    constructor() {
        super();
        this.state = {
            name: '',
            size: '', 
            description: '',
            tags: '',
            imageURI: null,
            images1: ''
        }
        this.addItem = this.addItem.bind(this);
    }

    uploadImageToStorage = async(imageName) => {
        var path = imageName;
        const response = await fetch(this.state.imageURI);
        const blob = await response.blob();
        
        firebase
          .storage()
          .ref(imageName)
          .put(blob, { contentType: 'image/jpeg', })
          .then((snapshot) => {
            //You can check the image is now uploaded in the storage bucket
            console.log(`${imageName} has been successfully uploaded.`);
          })
          .catch((e) => console.log('uploading image error => ', e));

          
    };
    

    pickImage = async() => {
        // Ask the user for the permission to access the media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
          this.updateInputVal(result.uri, 'imageURI');
        }
    };

    openCamera = async() => {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
              this.updateInputVal(result.uri, 'imageURI');
            }
        };

    addItem() {
        const result = Math.random().toString(36).substring(2,7);
        this.uploadImageToStorage('/'+result);
        imgs.push(result)
    }

    // make a button that adds all of states props to json list

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    render() {
        var imagePreview;
        if (this.state.imageURI == null) {
            imagePreview = <View>
            <Button style={{ marginTop: 10 }} inline rounded
                onPress={this.pickImage}>
                Select Image from Camera Roll
            </Button>
            <Button style={{ marginTop: 10 }} inline rounded
                 onPress={this.openCamera}>
                 Take Photo
            </Button>
            </View>
        } else {
            imagePreview = <Card.Image
               style={{ resizeMode: 'contain' }}
               source={{ uri: this.state.imageURI }}/>
        }
        
        return(
            <View style={styles.container}>
                <Card style={{ flex: 1 }}>
                     <Card.Title>Photo</Card.Title>
                     {imagePreview}
                </Card>
                <TextField
                    clearButton
                    style={styles.inputStyle}
                    placeholder="Name"
                    value={this.state.name}
                    onValueChange={(val) => this.updateInputVal(val, 'name')}
                />
                <TextField
                    clearButton
                    style={styles.inputStyle}
                    placeholder="Size"
                    value={this.state.size}
                    onValueChange={(val) => this.updateInputVal(val, 'size')}
                />
                <TextField
                    clearButton
                    style={styles.inputStyle}
                    placeholder="Description"
                    value={this.state.description}
                    onValueChange={(val) => this.updateInputVal(val, 'description')}
                />
                <TextField
                    clearButton
                    style={styles.inputStyle}
                    placeholder="Tags"
                    value={this.state.tags}
                    onValueChange={(val) => this.updateInputVal(val, 'tags')}
                />
                <Button style={{ marginTop: 10 }} inline rounded
                    onPress={this.addItem}>
                    Add Item to Closet
                </Button>
                
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 35,
        backgroundColor: '#fff'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: 'center',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        fontFamily: 'PingFang HK'
    },
    loginText: {
        color: '#636B66',
        marginTop: 25,
        textAlign: 'center',
        fontFamily: 'PingFang HK'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff"
    }
})


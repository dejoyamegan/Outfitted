import React, {Component, useState} from 'react';
import { Image, StyleSheet, Picker, Text, View, TextInput,  Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { Button, Collection, SegmentedControl, RowItem, TabBar} from 'react-native-ios-kit';
import { Card, ListItem, Container } from 'react-native-elements'
import { DynamicCollage, StaticCollage } from "react-native-images-collage";
//import { ReactPhotoCollage } from "react-photo-collage";
import {imgs} from '../closet/AddItemForm'


const photos2 = []
export default class Outfits extends Component {


    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            imageURI: null,
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }
    componentDidMount() {
        
        console.log(imgs[0]);
        for(var i = 0; i < imgs.length; i++){
            for(var j = 0; j < imgs[i].length; j++){
                console.log(imgs[i][j]);
                this.getImageFromStorage(imgs[i][j]);
                
            }
        }

    }

    getImageFromStorage(imageName) {
        let imageRef = firebase.storage().ref('/' + imageName);
        imageRef
          .getDownloadURL()
          .then((url) => {
            //from url you can fetched the uploaded image easily
            this.setState({ imageURI: url });
          })
          .catch((e) => console.log('getting downloadURL of image error => ', e));
    }

    render() {
        return(

            <View style={styles.container}>
                 <View style={{ marginVertical: 10 }}>
                 <Button style={styles.button} inline rounded
                 onPress={() => this.props.navigation.navigate('Runway')}>
                    Go to Runway
                </Button>
                </View>
                <Image
                        style={{ marginVertical: 15, width: 350, height: 350, alignSelf: 'center' }}
                        source={{ uri: this.state.imageURI }}
                        PlaceholderContent={<ActivityIndicator />}/>
                <NavBar navigation={this.props.navigation}/>
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
import React, {Component, useState} from 'react';
import { Image, StyleSheet, Picker, Text, View, TextInput,  Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { Button, Collection, SegmentedControl, RowItem, TabBar, SearchBar} from 'react-native-ios-kit';
import { Card, ListItem, Container } from 'react-native-elements'
import { DynamicCollage, StaticCollage } from "react-native-images-collage";
//import { ReactPhotoCollage } from "react-photo-collage";
import {imgs} from '../closet/AddItemForm'

const photos = [
   'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2021%2F07%2Fnike-dunk-high-womens-sneakers-aluminum-baby-blue-white-price-release-date-1.jpg?q=75&w=800&cbr=1&fit=max' ,
    'https://lsco.scene7.com/is/image/lsco/290370014-front-pdp?$qv_desktop_bottoms$' ,
     'https://di2ponv0v5otw.cloudfront.net/posts/2020/08/01/5f25afd9284e99d2de7607c3/m_5f25afec163df4604b30a4ca.jpg' 
     
  ]
  const photos2 = [
    'https://images.urbndata.com/is/image/UrbanOutfitters/63248462_049_d?$xlarge$&fit=constrain&qlt=80&wid=640' ,
     'https://i.ebayimg.com/images/g/q~QAAOSwCwJfeDFo/s-l400.jpg' ,
      'https://n.nordstrommedia.com/id/sr3/0ba58f2f-ca87-46f0-8b01-cc32261a6a3c.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838' 
      
   ]
const setting = {
    width: '300px',
    height: ['100px', '100px'],
    layout: [1, 4],
    photos: [
      { source: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2021%2F07%2Fnike-dunk-high-womens-sneakers-aluminum-baby-blue-white-price-release-date-1.jpg?q=75&w=800&cbr=1&fit=max' },
      { source: 'https://lsco.scene7.com/is/image/lsco/290370014-front-pdp?$qv_desktop_bottoms$' },
      { source: 'https://di2ponv0v5otw.cloudfront.net/posts/2020/08/01/5f25afd9284e99d2de7607c3/m_5f25afec163df4604b30a4ca.jpg' },
    ],
    showNumOfRemainingPhotos: true
  };

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
                <SearchBar
                    value={this.state.text}
                    onValueChange={text => this.setState({ text })}
                    withCancel
                    animated
                    />
                 <DynamicCollage
                     width={400}
                     height={400}
                     images={photos}
                     matrix={ [1,1,1] } />
                <DynamicCollage
                     width={400}
                     height={400}
                     images={photos2}
                     matrix={ [1,1,1] } />
                 <View style={{ marginVertical: 10 }}>
                 <Button style={styles.button} inline rounded>
                    Add Item
                </Button>
                </View>
                <View style={{ marginVertical: 10 }}>
                <Button style={styles.button} inline rounded>
                    Add Category
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
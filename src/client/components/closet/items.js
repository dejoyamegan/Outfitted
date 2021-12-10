import React, {Component} from 'react';
import { FlatList, StyleSheet, Text, View, TextInput,  Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { SearchBar, Title1, Button, Collection, SegmentedControl, RowItem, TabBar } from 'react-native-ios-kit';
import data from '../../data.json';
import { Card, ListItem, Container } from 'react-native-elements';
import {imgs} from './AddItemForm'
import userDetails from '../userDetails';
const pics = []
const picCount = []
let obj2 = '';
let sendUri = '';
let readPic = [];
const im2 = []
export default class Items extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            imageURI: null,
            name: ''
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
                console.log(imgs[i]);
                this.getImageFromStorage(imgs[i][j]);
            }
        }
        
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
              var query = "email=" + userDetails.email;
              var item = this.props.route.params.name;
              fetch("http://localhost:8080/getItemDetails?" + query + "&item=" + item, requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(JSON.parse(result))
                    obj2 = JSON.parse(result)
                    sendUri = obj2.uri
                    //Object.defineProperty(obj2, "uri", {
                    //    writable: true
                    //});
    
                    console.log(obj2.uri)
                    readPic.push(sendUri)
                    console.log(readPic)
                })
                .catch(error => console.log('error', error));
            
        

    }
    

    getImageFromStorage(imageName) {
        let imageRef = firebase.storage().ref('/' + imageName);
        imageRef
          .getDownloadURL()
          .then((url) => {
            //from url you can fetched the uploaded image easily
            this.setState({ imageURI: url });
            if(!pics.includes(url)){
            pics.push(url)
            this.setState({photoz: pics})
          }
            
            
          })
          .catch((e) => console.log('getting downloadURL of image error => ', e));
    }
    uriFunc(images){
        for(var i = 0; i < images.length; i++){
            if(picCount[i] != 1){
                picCount.push(1)
                return images[i]
            }
        }
    }
    
    renderImage(item) {
            return (<Card style={{ flex: 1 }}>
                <Card.Image
                    style={{ resizeMode: 'contain' }}
                    source={{ uri: item.key}}/>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Button
                        style={{ margin: 5 }} centered rounded>
                        Add to Dressing Room
                    </Button>
                    <Button
                        onPress={() => this.props.navigation.navigate('ItemView', { imageURI: item.key })}
                        style={{ margin: 5 }} centered rounded>
                        View Item
                    </Button>
                </View>
            </Card>);
        }
        
    render() {
        const shirtData = [
              {
               link: 'https://www.all4o.com/image/cache/data/brand/TrueStory/TRUE-STORY-Elite-orienteering-shirt-Men-Deep-BLUE-800x800.jpg'
              },
              {
               link: 'https://www.all4o.com/image/cache/data/brand/TrueStory/TRUE-STORY-Elite-orienteering-shirt-Men-Deep-BLUE-800x800.jpg'
              },
              {
               link: 'https://www.all4o.com/image/cache/data/brand/TrueStory/TRUE-STORY-Elite-orienteering-shirt-Men-Deep-BLUE-800x800.jpg'
              }
        ];

        const shoeData = [
            {
                link: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/464e8d65-3a82-472a-aa2c-de53b2dfe7f2/wearallday-shoe-6zKcQm.png'
            },
            {
                link: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/464e8d65-3a82-472a-aa2c-de53b2dfe7f2/wearallday-shoe-6zKcQm.png'
            },
            {
                link: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/464e8d65-3a82-472a-aa2c-de53b2dfe7f2/wearallday-shoe-6zKcQm.png'
            }
        ]

        var itemData;
        if (this.props.route.params.itemType === "Shirts") {
            itemData = shirtData;
        } else if (this.props.route.params.itemType === "Shoes") {
           itemData = shoeData;
        }
        
        
        
        
        const images = readPic.map(index => {
            return <img key={index} src={index} onClick={() => imageClick()}/>
         }); //Displays all the images the user has uploaded
         console.log(images)
         console.log(readPic)
        return(
            <View style={styles.container}>
                <SearchBar
                        style={{ marginTop: 10 }}
                        value={this.state.text}
                        onValueChange={text => this.setState({ text })}
                        withCancel
                        animated
                        />
                <View style={styles.container}>
                      <FlatList
                        data={images}
                        renderItem={({item}) => this.renderImage(item)}
                        keyExtractor={(item, index) => `${item}_${index}`}
                      />
                 </View>
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
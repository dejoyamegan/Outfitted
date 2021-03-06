import React, {Component} from 'react';
import { FlatList, StyleSheet, Text, View, TextInput,  Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { Icon, Spinner, SearchBar, Title1, Button, Collection, SegmentedControl, RowItem, TabBar } from 'react-native-ios-kit';
import data from '../../data.json';
import { Divider, Card, ListItem, Container } from 'react-native-elements';
import {imgs} from './AddItemForm'
import userDetails from '../userDetails';
const pics = []
const picCount = []
let obj2 = '';
let sendUri = '';
let sendName = '';
var allItems;
var items;
export let readNames = [];
export let readPic = [];
const im2 = []
export default class Items extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: true,
            imageURI: null,
            name: '',
            size: '', 
            color: '',
            tags: '',
            price: '',
            timesWorn: ''
        }
        this.category = this.props.route.params.itemType;
        this.fetchData();
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    addItemToDressingRoom(item) {
        var exists = false;
        for (var i = 0; i < userDetails.dressingRoom.length; i++) {
            if (userDetails.dressingRoom[i]['name'] == item.name) {
                exists = true;
                alert("Item already in dressing room.")
            }
        }
        if (!exists) {
            userDetails.dressingRoom.push(item);
            alert("Added to dressing room!");
        }
        console.log(userDetails);
    }

    fetchData() {
        // megan code
        console.log(userDetails);
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                });

                var options = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow',
                    //body: raw
                };

                var query = "email=" + userDetails.email;

                // add list of category names to categories field
                fetch("http://localhost:8080/getAllItems?" + query, options)
                    .then(response => response.text())
                    .then(result => {
                    //console.log(result)
                    //console.log(JSON.parse(result))
                    allItems = JSON.parse(result);
                    if (this.props.route.params.itemType != "") {
                        items = allItems.filter((item) => {
                            return item['category']['name'] == this.props.route.params.itemType;
                        });
                    } else {
                        items = allItems.filter((item) => {
                            return item['category']['name'];
                        });
                    }
                    
                    //console.log(items);
                    })
                    .then(() => this.setState({isLoading: false}))
                    .catch(error => this.errorHandler(error));

        //mira code
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
                    sendName = obj2.name
                    //Object.defineProperty(obj2, "uri", {
                    //    writable: true
                    //});

                    console.log(obj2.uri)
                    readPic.push(sendUri)
                    readNames.push(sendName)
                    console.log(readPic)
                    console.log(readNames)
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
                <Card.Title>{item.name}</Card.Title>
                <Card.Image
                    style={{ resizeMode: 'contain' }}
                    source={{ uri: item.uri}}/>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Button
                                onPress={() => this.addItemToDressingRoom(item)}
                                style={styles.button} centered rounded>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'PingFangSC-Thin' }}>Add To Dressing Room</Text>
                                    <Icon style={{ marginLeft: 4}} name={'add'} size={20} />
                                </View>
                            </Button>
                            <Button
                                onPress={() => this.props.navigation.navigate('ItemView', { itemObject: item })}
                                style={styles.button} centered rounded>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'PingFangSC-Thin' }}>View Item</Text>
                                    <Icon style={{ marginLeft: 4}} name={'shirt-outline'} size={20} />
                                </View>
                            </Button>
                    </View>
            </Card>);
        }
        
    render() {
        var content;
        if (this.state.isLoading) {
            content = <Spinner animating={true} />
        } else {
            content =  <FlatList
                                data = {items}
                                renderItem={({item}) => this.renderImage(item)}
                                keyExtractor={(item, index) => `${item}_${index}`}
                              />
        }

        const images = readPic.map(index => {
            return <img key={index} src={index} onClick={() => imageClick()}/>
         }); //Displays all the images the user has uploaded
         //console.log(images)
         //console.log(readPic)
        return(
            <View style={styles.container}>
                <SearchBar
                        theme={{ barColor: "#d1e0ed" }}
                        style={{ marginTop: 30 }}
                        value={this.state.text}
                        onValueChange={text => this.setState({ text })}
                        withCancel
                        animated
                        />
                <Divider color="#E0FF4F" orientation="horizontal" width={2}/>
                <View style={styles.container}>
                      {content}
                 </View>
                <NavBar navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
            fontFamily: 'PingFangSC-Thin',
            margin: 10,
            alignItems: 'center'
        },
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
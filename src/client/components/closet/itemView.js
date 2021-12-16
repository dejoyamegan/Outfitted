import React, {Component} from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View, TextInput,  Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { InfoRow, Body, Icon, Title1, Title2, Button, Collection, SegmentedControl, RowItem, TabBar } from 'react-native-ios-kit';
import { Image, Card, ListItem, Container } from 'react-native-elements';
import {imgs} from './AddItemForm'
import { index } from 'cheerio/lib/api/traversing';
import userDetails from "../userDetails.js";
export const pics = []
const pics2 = []
export default class ItemView extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            imageURI: null,
            photoz: [],
            name: '',
            size: '', 
            color: '',
            tags: '',
            price: '',
            timesWorn: '',
        }
    }

//    componentDidMount() {
//
//        console.log(imgs[0]);
//        for(var i = 0; i < imgs.length; i++){
//            for(var j = 0; j < imgs[i].length; j++){
//                console.log(imgs[i]);
//                this.getImageFromStorage(imgs[i][j]);
//            }
//        }
//
//
//    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    getImageFromStorage(imageName) {
        let imageRef = firebase.storage().ref('/' + imageName);
        imageRef
          .getDownloadURL()
          .then((url) => {
            //from url you can fetched the uploaded image easily
            //this.setState({ imageURI: url });
            if(!pics.includes(url)){
            pics.push(url)
            this.setState({photoz: pics})
            console.log(this.state.imageURI)
          }
            
            
          })
          .catch((e) => console.log('getting downloadURL of image error => ', e));
    }

    deleteItem(name, category) {
        var myHeaders = new Headers();
                //this.getCategory(this.props.route.params.categoryName);
                myHeaders.append("Content-Type", "application/json");
                //currently storing image name under "brand" -- need to change once db is restructured

                var requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders,
                    redirect: 'follow'
                  };
                  var query = "email=" + userDetails.email + "&item=" + name;

                  fetch("http://localhost:8080/deleteItem?" + query, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        userDetails.dressingRoom = userDetails.dressingRoom.filter((item) => {
                            return item.name != name;
                        });
                        console.log(userDetails.dressingRoom);
                        alert("Deleted!");
                        this.props.navigation.navigate("Items", { itemType: category })
                        })
                    .catch(error => console.log('error', error));
    }

    

/** 
<View><div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
{images}
</div>
</View>*/
    render() {
        const images = pics.map(index => {
            return <img key={index} src={index} onClick={() => imageClick()}/>
         }); //Displays all the images the user has uploaded
         const imageClick = () => {
            console.log('Click');
          } 
        const string1 = this.props.route.params.name;
        return(
            <View style={styles.container}>
                <Title1>{this.props.route.params.itemObject['name']}</Title1>
                <Image
                        style={{ marginVertical: 15, width: 350, height: 350, alignSelf: 'center' }}
                        source={{ uri: this.props.route.params.itemObject['uri']}}
                        PlaceholderContent={<ActivityIndicator />}/>
                <View style={{ width: "80%" }}>
                    <InfoRow theme={{ barColor: "#FEFFFE" }} icon="shirt-outline" title="Size" info={this.props.route.params.itemObject['size']}/>
                    <InfoRow theme={{ barColor: "#FEFFFE" }} icon="color-palette-outline" title="Color" info={this.props.route.params.itemObject['color']}/>
                    <InfoRow theme={{ barColor: "#FEFFFE" }} icon="ios-pricetag-outline" title="Price" info={this.props.route.params.itemObject['price']}/>
                    <InfoRow theme={{ barColor: "#FEFFFE" }} icon="ios-pricetag-outline" title="Times Worn" info={this.props.route.params.itemObject['timesWorn']}/>
                    <Button onPress={() => {
                        this.deleteItem(this.props.route.params.itemObject['name'], this.props.route.params.itemObject['category']['name']);
                        }}
                     center
                     rounded
                     style={{ marginTop: 15, flexDirection: 'row', alignSelf: 'center' }}>
                        <Body>Delete Item</Body>
                        <Icon size={20} name={'ios-trash-outline'} />
                    </Button>
                </View>
            </View>
        );
    }
}
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    infoRow: {
        width: 'inherit'
    }
})
import React, {Component} from 'react';
import { FlatList, Row, Image, StyleSheet, Text, View, TextInput,  Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { Icon, Stepper, Title1, Button, Collection, SegmentedControl, RowItem, TabBar} from 'react-native-ios-kit';
import { Card, ListItem, Container } from 'react-native-elements'
import {imgs} from '../closet/AddItemForm'
const pics = []
export const outfits1 = []
import { readPic } from '../closet/items';
import { readNames } from '../closet/items';
import userDetails from '../userDetails';
export default class DressingRoom extends Component {


    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            top: '',
            bottom: '',
            shoes: '',
            topLayer: '',
            accessory: '',
            pic1: '',
            pic2: '',
            pic3: '',
            pic4: '',
            pic5: ''
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    componentDidMount() {
        //console.log(imgs[0]);
        for(var i = 0; i < imgs.length; i++){
            for(var j = 0; j < imgs[i].length; j++){
                console.log(imgs[i]);
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
            //this.setState({ imageURI: url });
            if(!pics.includes(url)){
            pics.push(url)
            this.setState({photoz: pics})
            console.log(this.state.imageURI)
          }
            
            
          })
          .catch((e) => console.log('getting downloadURL of image error => ', e));
    }

    addToOutfit(key){
        outfits1.push(key)
        console.log(key)
        console.log(readPic[0])
        const indexPic = readPic.indexOf(key)
                if(this.state.top == null || this.state.top == ''){
                this.updateInputVal(readNames[indexPic], 'top')
                console.log(this.state.top)
                }
                else if(this.state.bottom == null || this.state.bottom == ''){
                    this.updateInputVal(readNames[indexPic], 'bottom')
                }
                else if(this.state.shoes == null || this.state.shoes == ''){
                    this.updateInputVal(readNames[indexPic], 'shoes')
                }
                else if(this.state.topLayer == null || this.state.topLayer== ''){
                    this.updateInputVal(readNames[indexPic], 'topLayer')
                }
                else if(this.state.accessory == null || this.state.accessory == ''){
                    this.updateInputVal(readNames[indexPic], 'accessory')
                }
                if(this.state.pic1 == null || this.state.pic1 == ''){
                    this.updateInputVal(readPic[indexPic], 'pic1')
                    console.log(this.state.top)
                }
                else if(this.state.pic2 == null || this.state.pic2 == ''){
                        this.updateInputVal(readPic[indexPic], 'pic2')
                }
                else if(this.state.pic3 == null || this.state.pic3 == ''){
                        this.updateInputVal(readPic[indexPic], 'pic3')
                }
                else if(this.state.pic4 == null || this.state.pic4 == ''){
                    this.updateInputVal(readPic[indexPic], 'pic4')
                }
                else if(this.state.pic5 == null || this.state.pic5 == ''){
                    this.updateInputVal(readPic[indexPic], 'pic5')
                }

            }

    addToOutfit2(item) {
        if (userDetails.outfit.length == 5) {
            alert("Outfit is full.");
        } else {
            var exists = false;
                    for (var i = 0; i < userDetails.outfit.length; i++) {
                        if (userDetails.outfit[i]['name'] == item.name) {
                            exists = true;
                            alert("Item already in Outfit.")
                        }
                    }
                    if (!exists) {
                        userDetails.outfit.push(item);
                        alert("Item added to outfit!");
                    }
                    console.log(userDetails);
        }
    }

    onSubmit() {
        if (userDetails.outfit.length < 5) {
            alert("Add 5 items to your outfit to continue.");
            return;
        } else {
            this.props.navigation.navigate("Runway");
        }
    }

    //<View onStartShouldSetResponder={() => this.props.navigation.navigate('ItemView')}>
    renderImage(item) {
        return (
        <Card style={{ flex: 1 }}>
            <Card.Title>{item.name}</Card.Title>
            <Card.Image
                style={{ resizeMode: 'contain' }}
                source={{ uri: item.uri}}/>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Button
                    style={{ margin: 5 }} centered rounded
                    onPress={() =>this.addToOutfit2(item)}>
                    Add to Outfit
                </Button>
                <Button
                    onPress={() => this.props.navigation.navigate('ItemView', { itemObject: item })}
                    style={{ margin: 5 }} centered rounded>
                    View Item
                </Button>
            </View>
        </Card>);
    }

    render() {
            const images = readPic.map(index => {
                return <img key={index} src={index} onClick={() => imageClick()}/>
             }); //Displays all the images the user has uploaded
            

        return(
            <View style={styles.container}>
                <Button style={{ alignItems: 'center' }} centered rounded
                    onPress={() => this.onSubmit()}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{alignSelf: 'center'}}>Finalize Outfit</Text>
                        <Icon style={{ marginLeft: 4 }} name={'checkmark'} size={20} />
                    </View>
                </Button>
                <View style={styles.container}>
                      <FlatList
                        data={userDetails.dressingRoom}
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
        padding: 10,
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
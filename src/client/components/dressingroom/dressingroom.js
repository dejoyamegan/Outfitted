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
        
    

    //<View onStartShouldSetResponder={() => this.props.navigation.navigate('ItemView')}>
    renderImage(item) {
        return (
        <Card style={{ flex: 1 }}>
            <Card.Image
                style={{ resizeMode: 'contain' }}
                source={{ uri: item.key}}/>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Button
                    style={{ margin: 5 }} centered rounded
                    onPress={() =>this.addToOutfit(item.key)}>
                    Add to Outfit
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
        const exampleData = [
                {
                    title : "Shoes",
                    data : ["https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/464e8d65-3a82-472a-aa2c-de53b2dfe7f2/wearallday-shoe-6zKcQm.png",
                            "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg"]
                },
                {
                    title : "Shirts",
                    data : ["https://www.all4o.com/image/cache/data/brand/TrueStory/TRUE-STORY-Elite-orienteering-shirt-Men-Deep-BLUE-800x800.jpg",
                            "https://imgprd19.hobbylobby.com/9/5f/26/95f264323ae49e65b2a53a909fcd7d9ee659f3c7/350Wx350H-422519-0320.jpg"]
                }
            ]
            const images = readPic.map(index => {
                return <img key={index} src={index} onClick={() => imageClick()}/>
             }); //Displays all the images the user has uploaded
            

        return(

            <View style={styles.container}>
                <Button style={{ alignItems: 'center' }} centered rounded
                    onPress={() => this.props.navigation.navigate('Runway', {top: this.state.top, bottom: this.state.bottom, shoes: this.state.shoes, 
                    pic1: this.state.pic1, pic2: this.state.pic2, pic3: this.state.pic3, pic4: this.state.pic4, pic5: this.state.pic5, topLayer: this.state.topLayer, accessory: this.state.accessory})}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{alignSelf: 'center'}}>Finalize Outfit</Text>
                        <Icon style={{ marginLeft: 4 }} name={'checkmark'} size={20} />
                    </View>
                </Button>
                <Button style={{ alignItems: 'center' }} centered rounded>
                <View style={{ flexDirection: 'row' }}>
                        <Text style={{alignSelf: 'center'}}>Add 5 items to make an outfit!</Text>
                        <Icon style={{ marginLeft: 4 }} name={'checkmark'} size={20} />
                    </View>
                    </Button>
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
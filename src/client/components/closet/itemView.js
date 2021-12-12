import React, {Component} from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View, TextInput,  Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { InfoRow, Body, Icon, Title1, Title2, Button, Collection, SegmentedControl, RowItem, TabBar } from 'react-native-ios-kit';
import { Image, Card, ListItem, Container } from 'react-native-elements';
import {imgs} from './AddItemForm'
import { index } from 'cheerio/lib/api/traversing';
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

    componentDidMount() {
        
        console.log(imgs[0]);
        for(var i = 0; i < imgs.length; i++){
            for(var j = 0; j < imgs[i].length; j++){
                console.log(imgs[i]);
                this.getImageFromStorage(imgs[i][j]);
            }
        }
        

    }

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
                <Title1>Megan's shirt</Title1>
                <Image
                        style={{ marginVertical: 15, width: 350, height: 350, alignSelf: 'center' }}
                        source={{ uri: this.props.route.params.imageURI}}
                        PlaceholderContent={<ActivityIndicator />}/>
                <View style={{ justifyContent: 'stretch' }}>
                    <InfoRow theme={{  }} icon="pencil-sharp" title="Name" info= {string1}/>
                    <InfoRow icon="shirt-outline" title="Size" info={this.props.route.params.size}/>
                    <InfoRow icon="color-palette-outline" title="Color" info={this.props.route.params.color}/>
                    <InfoRow icon="ios-pricetag-outline" title="Price" info={this.props.route.params.price}/>
                    <InfoRow icon="ios-pricetag-outline" title="Times Worn" info={this.props.route.params.timesWorn}/>
                    <Button center rounded style={{ marginTop: 15, flexDirection: 'row', alignSelf: 'center' }}>
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
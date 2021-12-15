import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput,  Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { Title2, TextField, Button, Collection, SegmentedControl, RowItem, TabBar} from 'react-native-ios-kit';
import { Overlay } from 'react-native-elements';
import { DynamicCollage, StaticCollage } from "react-native-images-collage";
//import { outfits1 } from './dressingroom';
import userDetails from '../userDetails';
import Gallery from "react-photo-gallery";
export const listCheck = []
let arrPic = []
const photos = [
   'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2021%2F07%2Fnike-dunk-high-womens-sneakers-aluminum-baby-blue-white-price-release-date-1.jpg?q=75&w=800&cbr=1&fit=max' ,
    'https://lsco.scene7.com/is/image/lsco/290370014-front-pdp?$qv_desktop_bottoms$' ,
     'https://di2ponv0v5otw.cloudfront.net/posts/2020/08/01/5f25afd9284e99d2de7607c3/m_5f25afec163df4604b30a4ca.jpg'

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

export default class DressingRoom extends Component {


    constructor() {
        super();
        this.state = {
            name: '',
            tags: '',
            isLoading: false,
            validSubmission: true,
            top: '',
            bottom: '',
            topLayer: '',
            accessory: '',
            shoes: '',
            pic1: '',
            pic2: '',
            pic3: '',
            pic4: '',
            pic5: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.acknowledgeError = this.acknowledgeError.bind(this);
    }

    validSubmission() {
        var result = true;
        if (this.state.name == null || this.state.name == "") {
            result = false;
            this.setState({
               validSubmission: false
            });
        }
        return result;
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    onSubmit() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
        "name": this.state.name,
        "top": {
            "name": this.props.route.params.top
        },
        "bottom": {
            "name": this.props.route.params.bottom
        },
        "topLayer": {
            "name": this.props.route.params.topLayer
        },
        "shoes": {
            "name": this.props.route.params.shoes
        },
        "accessory": {
            "name": this.props.route.params.accessory
        }
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        var query = "email=" + userDetails.email;
        fetch("http://localhost:8080/createOutfit?" + query, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
         }

         acknowledgeError() {
            this.setState({
            validSubmission: true
         });
        }
        renderImage() {
            arrPic = []
            
            arrPic.push({src: this.props.route.params.pic1, width: 1, height: 1})
            arrPic.push({src: this.props.route.params.pic2, width: 1, height: 1})
            arrPic.push({src: this.props.route.params.pic3, width: 1, height: 1})
            arrPic.push({src: this.props.route.params.pic4, width: 1, height: 1})
            arrPic.push({src: this.props.route.params.pic5, width: 1, height: 1})
            listCheck.push('yes')
            const images = arrPic.map(index => {
            return <img key={index} src={index} onClick={() => imageClick()}/>
         });
            console.log(images)
            return images
        }

    render() {
        //const images = outfits1.map(index => {
         //   return <img key={index} src={index} onClick={() => imageClick()}/>
         //});
         /**
                    <DynamicCollage
                        width={350}
                        height={350}
                        images={ this.renderImage() }
                        matrix={ [ 1, 2] } /> 
                        
                    <View style={{ alignSelf: 'center' }}>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        {this.renderImage()}
                    </div>
                </View>*/
         this.renderImage()
         const images = arrPic.map(index => {
            return <img key={index} src={index} onClick={() => imageClick()}/>
         });
        return(
                
            <View style={styles.container}>
                
                <div style={{width: '100vw'}}> <Gallery photos={arrPic}/> </div>
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
                    placeholder="Tags (Optional)"
                    value={this.state.tags}
                    onValueChange={(val) => this.updateInputVal(val, 'tags')}
                />
                 <Button style={{ marginTop: 15 }} centered inline rounded
                    onPress={this.onSubmit}>
                    Save Outfit
                </Button>
                <Button style={{ marginTop: 15 }} centered inline rounded
                    onPress={() => this.props.navigation.navigate('Outfits', {name: this.state.name || ''})}>
                    View Outfit
                </Button>
                <Overlay isVisible={!this.state.validSubmission}>
                    <Title2>Please give your outfit a name.</Title2>
                    <Button onPress={this.acknowledgeError} inline centered rounded>
                        OK
                    </Button>
                </Overlay>
                <NavBar navigation={this.props.navigation}/>
                </View>
        );
    }}


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
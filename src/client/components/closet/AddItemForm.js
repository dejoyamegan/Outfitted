import React, {useState, Component} from 'react';
import { StyleSheet, Image, Text, View, TextInput, Platform, Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import { Icon, Spinner, Title2, Button, Collection, SegmentedControl, RowItem, TabBar, TextField} from 'react-native-ios-kit';
import data from '../../data.json'
import { Overlay, Card, ListItem, Container } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
export const imgs = [];
const imgs2 = []
import userDetails from '../userDetails';
export default class AddItemForm extends Component {


    constructor() {
        super();
        this.state = {
            name: '',
            size: '', 
            color: '',
            tags: '',
            price: '',
            timesWorn: '',
            imageURI: null,
            images1: '',
            validSubmission: true,
            invalidMessages: [],
            category: null,
            progress: 0.0,
            added: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.acknowledgeError = this.acknowledgeError.bind(this);
    }

    componentDidMount() {
        this.getCategory(this.props.route.params.categoryName);
    }

    validSubmission() {
        var result = true;
        var messages = [];
        if (this.state.imageURI == null || this.state.imageURI == "") {
            result = false;
            messages.push("-Image");
        }
        if (this.state.name == null || this.state.name == "") {
            result = false;
            messages.push("-Name");
        }
        if (this.state.size == null || this.state.size == "") {
            result = false;
            messages.push("-Size");
        }
        if (this.state.color == null || this.state.color == "") {
            result = false;
            messages.push("-Color");
        }
        if (!result) {
            this.setState({
                invalidMessages: messages,
                validSubmission: false
            });
        }
        return result;
    }

    getCategory(name){
        var options = {
            method: 'GET',
            redirect: 'follow'
        };

        var query = "name=" + name + "&email=" + userDetails.email;
        //console.log("http://localhost:8080/getCategoryDetails?" + query)

        // add list of category names to categories field
        fetch("http://localhost:8080/getCategoryDetails?" + query, options)
            .then(response => response.text())
            .then(result => {
                console.log(JSON.parse(result));
                this.setState({ category: JSON.parse(result)});
            })
            .catch(error => this.errorHandler(error));
    }

    uploadImageToStorage = async(imageName) => {
        const that = this;
        var path = imageName;
        const response = await fetch(this.state.imageURI);
        const blob = await response.blob();

        const uploadTask = firebase
           .storage()
           .ref(imageName)
           .put(blob, { contentType: 'image/jpeg', });
        uploadTask.on('state_changed',
             (snapshot) => {
               // Observe state change events such as progress, pause, and resume
               // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
               console.log('Upload is ' + snapshot.state);
               const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               this.setState({ progress: prog });
             },
             (error) => {
               this.errorHandler(error);
             },
             () => {
               // Handle successful uploads on complete
               // For instance, get the download URL: https://firebasestorage.googleapis.com/...
               uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                 console.log(downloadURL);
                 this.addItemToDB(downloadURL);
               });
             }
           );
    };

    addItemToDB = (url) => {
        var myHeaders = new Headers();
                //this.getCategory(this.props.route.params.categoryName);
                console.log(this.state.category);
                myHeaders.append("Content-Type", "application/json");
                //currently storing image name under "brand" -- need to change once db is restructured
                var raw = JSON.stringify({
                    "name": this.state.name,
                    "color": this.state.color,
                    "size": this.state.size,
                    "price": this.state.price,
                    "timesWorn": this.state.timesWorn,
                    "uri": url,
                    "category": this.state.category
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                  };
                  var query = "email=" + userDetails.email;

                  fetch("http://localhost:8080/createItem?" + query, requestOptions)
                    .then(response => response.text())
                    .then(result => this.setState({ added: true }))
                    .catch(error => console.log('error', error));
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


    // make a button that adds all of states props to json list

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    onSubmit() {
        this.getCategory(this.props.route.params.categoryName);
        const result = Math.random().toString(36).substring(2,7);
        imgs2.push(result)
        imgs.push(imgs2)
        console.log(imgs)
        this.uploadImageToStorage('/'+result);
    }
    
    acknowledgeError() {
        this.setState({
            validSubmission: true,
            invalidMessages: []
        });
    }

    onPressOk() {
        this.setState({ progress: 0.0 });
        this.props.navigation.navigate('Items', { name: this.state.name, itemType: this.props.route.params.categoryName });
    }

    render() {
        var imagePreview;
        if (this.state.imageURI == null) {
            imagePreview = <View>
                <Button style={styles.button} centered
                    onPress={this.pickImage}>
                    <View style={{ flexDirection: 'row' }}>
                    <Text style={{alignSelf: 'center', fontSize: 20, fontFamily: 'PingFangSC-Thin'}}>Upload an image</Text>
                    <Icon style={{ alignSelf: 'center', marginLeft: 10 }} name={'cloud-upload'} size={20} />
                    </View>
                </Button>
                <Text style={styles.button}>-or-</Text>
                <Button style={styles.button} centered
                    onPress={this.openCamera}>
                    <View style={{ flexDirection: 'row' }}>
                    <Text style={{alignSelf: 'center', fontSize: 20, fontFamily: 'PingFangSC-Thin'}}>Take a Photo</Text>
                    <Icon style={{ alignSelf: 'center', marginLeft: 10 }} name={'ios-camera-outline'} size={20} />
                    </View>
                </Button>
            </View>
        } else {
            imagePreview = <Card.Image
               style={{ resizeMode: 'contain' }}
               source={{ uri: this.state.imageURI }}/>
        }

        var overlayContent;
        if (this.state.added) {
            overlayContent = <View>
                <Title2>Item Added!</Title2>
                <Button
                onPress={() => this.onPressOk()}
                style={{ marginTop: 10 }}
                centered
                inline
                rounded>OK</Button>
                </View>;
        } else {
            overlayContent = <View>
                <Title2>Adding Item...</Title2>
                <Spinner animating={true} />
                </View>;
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
                    placeholder="Color"
                    value={this.state.color}
                    onValueChange={(val) => this.updateInputVal(val, 'color')}
                />
                <TextField
                    clearButton
                    style={styles.inputStyle}
                    placeholder="Price"
                    value={this.state.price}
                    onValueChange={(val) => this.updateInputVal(val, 'price')}
                />
                <TextField
                    clearButton
                    style={styles.inputStyle}
                    placeholder="Times Worn"
                    value={this.state.timesWorn}
                    onValueChange={(val) => this.updateInputVal(val, 'timesWorn')}
                />
                <Button style={{ marginTop: 15 }} centered inline rounded
                    onPress={this.onSubmit}>
                    Add Item to Closet
                </Button>
                <Overlay isVisible={this.state.progress != 0.0}>
                    {overlayContent}
                </Overlay>
                <Overlay isVisible={!this.state.validSubmission}>
                    <Title2 style={{ paddingBottom: 10 }}>Please fill in the following fields:</Title2>
                    {this.state.invalidMessages.map((message) => {
                        return <Title2>{message}</Title2>;
                    })}
                    <Button onPress={this.acknowledgeError} inline centered rounded>
                        OK
                    </Button>
                </Overlay>
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
    button: {
            marginTop: 10,
            fontFamily: "PingFangSC-Thin",
            alignSelf: 'center'
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

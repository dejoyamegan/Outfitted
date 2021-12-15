import React, {Component} from 'react';
import { Image, StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import { TextField, Button } from 'react-native-ios-kit';
import userDetails from '../userDetails.js';

export default class Login extends Component {


    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            user: '',
            uid: '',
            closet: null
        }
    }

//    componentDidMount() {
//            userDetails.email = null;
//            userDetails.closet = null;
//            userDetails.dressingRoom = [];
//        }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    //TODO: Change to only one API call and user prop determines navigation
    userLogin = () => {
        if(this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signin')
        } else {
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                // console.log(res)
                console.log("Consoled logged in!")
                let userAuth = firebase.auth().currentUser;
                //console.log(userAuth.uid);
                this.setState({
                    email: userAuth.email,
                    uid: userAuth.uid,
                    user: JSON.stringify(userAuth)
                });
                this.fetchDbUser();
            })
            .then(() => {
                userDetails.closet = this.state.closet;
                userDetails.email = this.state.email;
                userDetails.dressingRoomNames = [];
                this.props.navigation.navigate('Closet');
            })
            .catch(error => this.errorHandler(error))
        }
    }

    fetchDbUser() {
        let requestOptions = {
            method: 'GET'
        };
        var json_user = JSON.parse(this.state.user);
        var displayName = json_user["displayName"];

        let query = "closet=" + displayName + "&email=" + this.state.email;

        let url = "http://localhost:8080/getClosetDetails?" + query;
        //console.log(url);

        fetch(url, requestOptions)
            .then((response) =>  {
                //console.log(response);
                return response.text();
            })
            .then(result => {
                //console.log(result);
                var json_closet = JSON.parse(result);
                this.setState({ closet: json_closet });
                //userDetails.closet = json_closet;
                //userDetails.email = this.state.email;
            })
            .catch(error => this.errorHandler(error));
        }

    errorHandler(error) {
            if (error.name != "SyntaxError") {
                alert(error.name);
            }
            //document.location.reload(true);
        }
        

    render() {
        return(
            <View style={styles.container}>
                <Image style={{ width: 410, alignSelf: 'center', resizeMode: 'contain' }} source={require('../styles/logo.png')} />
                <TextField
                    clearButton
                    style={styles.inputStyle}
                    placeholder="Email"
                    value={this.state.email}
                    onValueChange={(val) => this.updateInputVal(val, 'email')}
                />
                <TextField
                    clearButton
                    placeholder="Password"
                    value={this.state.password}
                    onValueChange={(val) => this.updateInputVal(val, 'password')}
                    maxLength= {15}
                    secureTextEntry = {true}
                />
                <View style={{ marginTop: 25 }}>
                    <Button
                        center
                        rounded
                        style={styles.button}
                        onPress={() => this.userLogin()}
                    >
                    Login
                    </Button>
                </View>
                <Text style={styles.loginText}
                    onPress={() => this.props.navigation.navigate('Signup')}>
                    Don't have an account? Click here to Signup
                </Text>
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
    loginText: {
            color: "#636B66",
            marginTop: 25,
            textAlign: "center",
            fontFamily: 'PingFang HK'
        },
})
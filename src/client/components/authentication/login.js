import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import { TextField, Button } from 'react-native-ios-kit';

export default class Login extends Component {


    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            user: '',
            uid: ''
        }
    }

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
            //.then(this.fetchDbUser())
            .then(this.props.navigation.navigate('Closet'))
            .catch(error => this.setState({errorMessage: error.message}))
        }
    }

    fetchDbUser = () => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            accept: 'application/json'
        };
        //var params = new URLSearchParams();
        //params.append("uid", this.state.uid);

        console.log(this.state.email)
        let query = "uid=" + this.state.email;
        let url = "http://localhost:8080/getUserDetails?" + query;
        console.log(url);
        fetch(url, requestOptions)
            .then((response) =>  {
                console.log(JSON.stringify(response));
                return response.text();
            })
            .then(result => console.log("Fetch result: " + result + "is the Firestore user"))
            .catch(error => console.log('error', error));
        }
        

    render() {
        return(
            <View style={styles.container}>
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
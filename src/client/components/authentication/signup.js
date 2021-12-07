import React, {Component} from 'react';
import { CheckBox, StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../../firebase';
import { TextField, Button } from 'react-native-ios-kit'

export default class Signup extends Component {

    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            isLoading: false,
            uid: ''
        }
    }

    
    updateInputVal = (val, prop) => {
        
        const state = this.state;
        if (prop == 'isOwner') {
            state['checkBoxSelected'] = !state['checkBoxSelected'];
        }
        state[prop] = val;
        this.setState(state);
        
    }

    //Will's API TESTING
    //Create user
    //create an empty closet
    // Do we have demo dummy items to show users how to use app?
    //if yes 
    // Animation on how the items work, how to add item, category, outfit etc.
    // if no
    // Empty closet with simple modals with arrows pointing at buttons
    // No items or categories displaying at first
    addUser = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var userRaw = JSON.stringify({
           "name": this.state.displayName,
           "uid": this.state.uid,
           "email": this.state.email.toLowerCase()
        });

        var options = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: userRaw
        };

        // create new user in db
        fetch("http://localhost:8080/createUser", options)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => this.errorHandler(error));

        var closetRaw = JSON.stringify({
            "owner": this.state.displayName
        });

        options.body = closetRaw;

        //create empty closet for new user
        var query = "email=" + this.state.email.toLowerCase();
        fetch("http://localhost:8080/createCloset?" + query, options)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => this.errorHandler(error));
    }


    errorHandler(error) {
        alert(error);
        //document.location.reload(true);
    }

    registerUser = () => {
        if(this.state.email === '' && this.state.password === ''){
            Alert.alert('Enter details to Signup!')
        }else if(this.state.password.length < 6){ 
            Alert.alert('Password Too short! Must be at least 6 Characters.')
        }
        else{
            this.setState({
                isLoading: true,
            })
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email.toLowerCase(), this.state.password)
            .then( (res) => {
                res.user.updateProfile({
                    displayName: this.state.displayName
                })
                this.setState({
                     isLoading: false,
                     uid: res.user.uid
                })
                this.addUser();
                console.log("User registered Successfully!");
                this.props.navigation.navigate("Closet");
            })
            .catch((error) => {
                this.errorHandler(error);
            })
        }
    }
    

    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.preloader} >
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <TextField
                    style={styles.inputStyle}
                    placeholder="Name"
                    value={this.state.displayName}
                    onValueChange={(val) => this.updateInputVal(val, 'displayName')}
                />
                <TextField
                    clearButton
                    style={styles.inputStyle}
                    placeholder="Email"
                    value={this.state.email}
                    onValueChange={(val) => this.updateInputVal(val, 'email')}
                />
                <TextField
                    clearButton
                    style={styles.inputStyle}
                    placeholder='Password'
                    value={this.state.password}
                    //TODO No password storing in frontend
                    onValueChange={(val)=> this.updateInputVal(val,'password')}
                    maxLength={15}
                    secureTextEntry={true}
                />
                <View style={{ marginTop: 25 }}>
                    <Button
                        center
                        rounded
                        onPress={()=> this.registerUser()}>
                        Signup
                    </Button>
                </View>
                <Text
                    style={styles.loginText}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    Already Registered? Click here to Login
                </Text>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 35,
        backgroundColor: "#fff"
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
        color: "#636B66",
        marginTop: 25,
        textAlign: "center",
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
    },
    checkboxContainer: {
        flexDirection: "row",
        marginVertical: 10
      },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
        fontFamily: 'PingFang HK'
    },
    button: {
        fontFamily: 'PingFang HK'
    }
})
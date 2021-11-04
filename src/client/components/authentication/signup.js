import React, {Component} from 'react';
import { CheckBox, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../../firebase';
import { TextField } from 'react-native-ios-kit'

export default class Signup extends Component {

    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            isAdmin: '',
            isLoading: false,
            checkBoxSelected: false,
            appStatus: "Unsubmitted"
        }
    }

    DisplayAnImage = () => {
        return (
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
              }}
            />
          </View>
        );
      }

    
    updateInputVal = (val, prop) => {
        
        const state = this.state;
        if (prop == 'isOwner') {
            state['checkBoxSelected'] = !state['checkBoxSelected'];
        }
        state[prop] = val;
        this.setState(state);
        
    }

    directUserSignUp(){

        if (this.state['checkBoxSelected']){
            this.props.navigation.navigate('OwnerDashboard');
        }else{
            this.props.navigation.navigate('RenterDashboard')
        }
    }
    /**addNewUser = () => {
        const database = firebase.database();
        console.log(firebase.auth().currentUser.uid);
        const refDb = database.ref("/Users/" + firebase.auth().currentUser.uid );
        refDb.set({
            full_name: this.state.displayName,
            email_account: this.state.email,
            admin_account: this.state.checkBoxSelected,
            app_status: this.state.appStatus
            
        });
    }**/

    errorHandler = (error) => {
        alert(error);
        this.props.navigation.navigate('Signup');
        location.reload();
    } 

    registerUser = ()=> {
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
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then( (res) => {
                res.user.updateProfile({
                    displayName: this.state.displayName
                })
                console.log("User registered Successfully!");
                //this.addNewUser();
                this.setState({
                    isLoading: false,
                    displayName: '',
                    email: '',
                    password: ''
                })
                this.directUserSignUp();
                
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
                    onValueChange={(val)=> this.updateInputVal(val,'password')}
                    maxLength={15}
                    secureTextEntry={true}
                />
                <View style={{ marginVertical: 10 }}>
                    <Button
                        style={styles.button}
                        color="#156F26"
                        title="Signup"
                        onPress={()=> this.registerUser()}
                    />
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
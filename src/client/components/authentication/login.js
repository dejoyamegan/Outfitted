import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import { TextField } from 'react-native-ios-kit';

export default class Login extends Component {


    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: false
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
            this.setState({
                isLoading: true,
            })
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                console.log(res)
                console.log('Console logged in successfully')
                this.setState({
                    isLoading: true,
                    email: '',
                    password: '',
                })
                this.props.navigation.navigate('RenterDashboard')

            })
            .catch(error => this.setState({errorMessage: error.message}))
        }
    }

    render() {
        //if(this.state.isLoading){
        //    return(
        //        <View style={styles.preloader}>
        //            <ActivityIndicator size="large" color="#9E9E9E" />
        //        </View>
        //    )
        //}
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
                    style={styles.inputStyle}
                    placeholder="Password"
                    value={this.state.password}
                    onValueChange={(val) => this.updateInputVal(val, 'password')}
                    maxLength= {15}
                    secureTextEntry = {true}
                />
                <View style={{ marginVertical: 10 }}>
                    <Button
                        color="#156F26"
                        title="Closet"
                        onPress={() => this.props.navigation.navigate('Closet')}
                    />
                </View>
                <Text
                    style={styles.loginText}
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
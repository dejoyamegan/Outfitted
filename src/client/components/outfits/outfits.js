import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput,  Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { Button, Collection, SegmentedControl, RowItem, TabBar} from 'react-native-ios-kit';
import { Card, ListItem, Container } from 'react-native-elements'


export default class Outfits extends Component {


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


    render() {
        return(

            <View style={styles.container}>
                <Card>
                    <Card.Title></Card.Title>
                    <Card.Divider/>
                    <Card.Image source={{uri: 'https://i.pinimg.com/originals/12/60/32/1260325e53e9c6b8819335d2d385e8fc.jpg'}}/>
                    <Text style={{marginBottom: 10}}>
                        My Dinner Outfit
                        </Text>
                        <Button style={styles.button} inline rounded>
                            Add to Dressing Room
                        </Button>
                </Card>
                 <View style={{ marginVertical: 10 }}>
                 <Button style={styles.button} inline rounded>
                    Add Item
                </Button>
                </View>
                <View style={{ marginVertical: 10 }}>
                <Button style={styles.button} inline rounded>
                    Add Category
                </Button>
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
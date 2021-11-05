import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput,  Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import { Button, Collection, SegmentedControl, RowItem, TabBar, TextField} from 'react-native-ios-kit';
import data from '../../data.json'


export default class AddItemForm extends Component {


    constructor() {
        super();
        this.state = {
            name: '',
            size: '', 
            description: '',
            tags: ''
        }
    }

    // make a button that adds all of states props to json list

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    render() {
        return(
            <View style={styles.container}>
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
                    placeholder="Description"
                    value={this.state.description}
                    onValueChange={(val) => this.updateInputVal(val, 'description')}
                />
                <TextField
                    clearButton
                    style={styles.inputStyle}
                    placeholder="Tags"
                    value={this.state.tags}
                    onValueChange={(val) => this.updateInputVal(val, 'tags')}
                />
                <Button style={styles.button} inline rounded
                    onPress={() => this.props.navigation.navigate('Closet')}>
                    Add Item
                </Button>
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
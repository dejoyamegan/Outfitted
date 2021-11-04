import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput,  Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { Button, Collection, SegmentedControl, RowItem, TabBar } from 'react-native-ios-kit';
import data from '../../data.json'
import { Card, ListItem, Container } from 'react-native-elements'

const exampleData = [
    {
        name : "Drew",
        size : "Large", 
        description : "Cool shirt",
        tag : "Cool, shirt",
        location : "'../../images/drewshoe.jpg'"
    }
]

export default class Closet extends Component {

    showdata = () => {
        const jsonData = data.map((obj) => {
            return (
                <Card key = {obj.name}>
                    <Card.Body>
                        <Card.Text>
                            {obj.description}
                            {obj.size}
                            {obj.tags}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })
    }

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


/** 
<SegmentedControl
values={['One', 'Two']}
selectedIndex={this.state.selectedIndex}
onChange={(event) => {
    this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
}}
/>*/

    render() {
        return(
            
            <View style={styles.container}>
                <Card>
                    <Card.Title>HELLO WORLD</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={require('../../images/drewshoe.jpg')}/>
                    <Text style={{marginBottom: 10}}>
                        Drew's cool shoe
                        </Text>
                        <Button style={styles.button} inline rounded>
                            Add to Dressing Room
                        </Button>
                </Card>
                <View style={{ marginVertical: 10 }}>
                <Button style={styles.button} inline rounded
                    onPress={() => this.props.navigation.navigate('AddItemForm')}>
                    Add Item
                </Button>
                </View>
                <View style={{ marginVertical: 10 }}>
                <Button style={styles.button} inline rounded
                    onPress={() => this.props.navigation.navigate('Signup')}>
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
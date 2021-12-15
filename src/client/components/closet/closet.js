import React, {Component} from 'react';
import { ScrollView, FlatList, StyleSheet, Text, View, TextInput,  Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { Spinner, Icon, Title1, Button, Collection, SegmentedControl, RowItem, TabBar } from 'react-native-ios-kit';
import data from '../../data.json';
import { Card, ListItem, Container } from 'react-native-elements';
import userDetails from '../userDetails.js';
export let categoryNames = [];
let categories;
export let pictures = [];
let sendPicture = '';
let sendName = '';
let json = '';
let json2 = '';
import Header from '../common/header.js';

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
            email: userDetails.email,
            password: '',
            isLoading: true
        }
        console.log(userDetails.closet);
        console.log(userDetails.email);
        this.fetchData();
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    renderImage(item) {
            return (
                <Card style={{ flex: 1 }}>
                <Card.Title>{item.name}</Card.Title>
                <Card.Image
                    style={{ resizeMode: 'contain' }}
                    source={{ uri: item.uri}}/>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button
                            onPress={() => this.props.navigation.navigate('AddItemForm', { categoryName: item.name })}
                            style={{ margin: 10, alignItems: 'center'}} centered rounded>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>Add Item</Text>
                                <Icon style={{ marginLeft: 4}} name={'add'} size={20} />
                            </View>
                        </Button>
                        <Button
                            onPress={() => this.props.navigation.navigate('Items', { itemType: item.name })}
                            style={{ margin: 10, alignItems: 'center'}} centered rounded>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>View Items</Text>
                                <Icon style={{ marginLeft: 4}} name={'shirt-outline'} size={20} />
                            </View>
                        </Button>
                </View>
            </Card>);
        }


    fetchData() {
        //this.getAllCategories();
        console.log("please got here 2");
         // stores string categories into categories list
        // //console.log("categories" + categories[1]['name']);
        // categories.map((name) => {
        //     this.getCategory(name['name']);
        // });

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        });

        var options = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            //body: raw
        };

        var query = "email=" + userDetails.email;

        // add list of category names to categories field
        fetch("http://localhost:8080/getAllCategories?" + query, options)
            .then(response => response.text())
            .then(result => {
            //console.log(result)
            //console.log(JSON.parse(result))
            categories = JSON.parse(result);
            console.log(categories);
//            for(var i = 0; i < categories.length; i++){
//               this.getCategory(categories[i].name)
//            }
            this.setState({isLoading: false});
            })
            .catch(error => this.errorHandler(error));
    }

    errorHandler(error) {
        alert(error);
        //document.location.reload(true);
    }

    render() {

        const images = pictures.map(index => { // need to change this
            return <img key={index} src={index} onClick={() => imageClick()}/>
        });

        var content;
        if (this.state.isLoading) {
            content = <Spinner animating={true} />
        } else {
            content =  <FlatList
                                //data={exampleData}
                                data = {categories}
                                renderItem={({item}) => this.renderImage(item)}
                                keyExtractor={(item, index) => `${item}_${index}`}
                              />
        }
        console.log(images)
        return(
                <View style={styles.container}>
                    <Button style={{ margin: 10, alignItems: 'center' }} centered rounded
                        onPress={() => this.props.navigation.navigate('AddCategoryForm')}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{alignSelf: 'center'}}>Add Category</Text>
                            <Icon style={{ marginLeft: 4 }} name={'add'} size={20} />
                        </View>
                    </Button>
                    <Button style={{ margin: 10, alignItems: 'center' }} centered rounded
                        onPress={() => this.props.navigation.navigate('Items', { itemType: "" })}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{alignSelf: 'center'}}>View All Items</Text>
                            <Icon style={{ marginLeft: 4 }} name={'add'} size={20} />
                        </View>
                    </Button>
                        <View style={styles.container}>
                              {content}
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
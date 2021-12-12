import React, {Component} from 'react';
import { ScrollView, FlatList, StyleSheet, Text, View, TextInput,  Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { Icon, Title1, Button, Collection, SegmentedControl, RowItem, TabBar } from 'react-native-ios-kit';
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
            isLoading: false
        }
        console.log(userDetails.closet);
        console.log(userDetails.email);
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
                    source={{ uri: item.key}}/>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button
                            onPress={() => this.props.navigation.navigate('AddItemForm')}
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

    componentDidMount() {
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
            console.log(result)
            console.log(JSON.parse(result))
            categories = JSON.parse(result)
            for(var i = 0; i < categories.length; i++){
               this.getCategory(categories[i].name)
            }
            
            })
            .catch(error => this.errorHandler(error));
    }
    getCategory(name){
        //getCategoryDetails 
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

        var query = "name=" + name + "&email=" + userDetails.email;
        console.log("http://localhost:8080/getCategoryDetails?" + query)

        // add list of category names to categories field
        fetch("http://localhost:8080/getCategoryDetails?" + query, options)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                json = JSON.parse(result);
                sendName = json.name;
                sendPicture = json.uri; // do this when store the URI

                categoryNames.push(sendName);
                pictures.push(sendPicture);
                console.log(categoryNames)
                console.log(sendPicture)
            })
            .catch(error => this.errorHandler(error));
    }

    getAllCategories = () => {

        //console.log("categories" + categories[1]['name']);
        
        
    }

    errorHandler(error) {
        alert(error);
        //document.location.reload(true);
    }

    render() {

        const exampleData = [
              {name: 'Shirts',
               link: 'https://www.all4o.com/image/cache/data/brand/TrueStory/TRUE-STORY-Elite-orienteering-shirt-Men-Deep-BLUE-800x800.jpg'
              },
              {name: 'Shoes',
               link: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/464e8d65-3a82-472a-aa2c-de53b2dfe7f2/wearallday-shoe-6zKcQm.png'
              }
        ];

        const images = pictures.map(index => { // need to change this
            return <img key={index} src={index} onClick={() => imageClick()}/>
        });
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
                        <View style={styles.container}>
                              <FlatList
                                //data={exampleData}
                                data = {images}
                                renderItem={({item}) => this.renderImage(item)}
                                keyExtractor={(item, index) => `${item}_${index}`}
                              />
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
import React, {Component} from 'react';
import { Row, Image, StyleSheet, Text, View, TextInput,  Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { Icon, Stepper, Title1, Button, Collection, SegmentedControl, RowItem, TabBar} from 'react-native-ios-kit';
import { Card, ListItem, Container } from 'react-native-elements'


export default class DressingRoom extends Component {


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

    renderImage(item) {
        return (<Card style={{ flex: 1 }}>
            <Card.Image
                style={{ resizeMode: 'contain' }}
                source={{ uri: item}}/>
            <Button style={{ height: 43 }}centered rounded>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={{}}>Add to Outfit</Text>
                    <Icon style={{}} name='add-circle-outline' size={20} />
                </View>
            </Button>
        </Card>);
    }

    render() {
        const exampleData = [
                {
                    title : "Shoes",
                    data : ["https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/464e8d65-3a82-472a-aa2c-de53b2dfe7f2/wearallday-shoe-6zKcQm.png",
                            "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg"]
                },
                {
                    title : "Shirts",
                    data : ["https://www.all4o.com/image/cache/data/brand/TrueStory/TRUE-STORY-Elite-orienteering-shirt-Men-Deep-BLUE-800x800.jpg",
                            "https://imgprd19.hobbylobby.com/9/5f/26/95f264323ae49e65b2a53a909fcd7d9ee659f3c7/350Wx350H-422519-0320.jpg"]
                }
            ]

        return(

            <View style={styles.container}>
                 <Collection
                   numberOfColumns={4}
                   data={exampleData}
                   renderItem={item => this.renderImage(item)}
                   renderSectionHeader={({ section }) => <Title1>{section.title}</Title1>}
                   keyExtractor={(item, index) => `${item}_${index}`}
                 />
                 <Button
                    style = {styles.button} inline rounded
                    onPress={() => this.props.navigation.navigate("Runway")}>
                        Go to Runway
                 </Button>
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
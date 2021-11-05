import React, {Component} from 'react';
import { FlatList, StyleSheet, Text, View, TextInput,  Alert, ActivityIndicator, Image } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { Title1, Button, Collection, SegmentedControl, RowItem, TabBar } from 'react-native-ios-kit';
import data from '../../data.json';
import { Card, ListItem, Container } from 'react-native-elements';

export default class Items extends Component {

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
                <View>
                    <Card.Image
                        style={{ resizeMode: 'contain' }}
                        source={{ uri: item.link}}/>
                </View>
                <Button
                    style={{ marginTop: 5}} centered rounded>
                    Add to Dressing Room
                </Button>
            </Card>);

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

        const shirtData = [
              {
               link: 'https://www.all4o.com/image/cache/data/brand/TrueStory/TRUE-STORY-Elite-orienteering-shirt-Men-Deep-BLUE-800x800.jpg'
              },
              {
               link: 'https://www.all4o.com/image/cache/data/brand/TrueStory/TRUE-STORY-Elite-orienteering-shirt-Men-Deep-BLUE-800x800.jpg'
              },
              {
               link: 'https://www.all4o.com/image/cache/data/brand/TrueStory/TRUE-STORY-Elite-orienteering-shirt-Men-Deep-BLUE-800x800.jpg'
              }
        ];

        const shoeData = [
            {
                link: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/464e8d65-3a82-472a-aa2c-de53b2dfe7f2/wearallday-shoe-6zKcQm.png'
            },
            {
                link: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/464e8d65-3a82-472a-aa2c-de53b2dfe7f2/wearallday-shoe-6zKcQm.png'
            },
            {
                link: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/464e8d65-3a82-472a-aa2c-de53b2dfe7f2/wearallday-shoe-6zKcQm.png'
            }
        ]

        var itemData;
        if (this.props.route.params.itemType === "Shirts") {
            itemData = shirtData;
        } else if (this.props.route.params.itemType === "Shoes") {
            itemData = shoeData;
        }

        return(
            <View style={styles.container}>
                <View style={styles.container}>
                      <FlatList
                        data={itemData}
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
import React, {Component, useState} from 'react';
import { FlatList, ScrollView, Image, StyleSheet, Picker, Text, View, TextInput,  Alert, ActivityIndicator } from 'react-native';
import firebase from '../../firebase';
import NavBar from '../common/navbar';
import { Spinner, Button, Collection, SegmentedControl, RowItem, TabBar, SearchBar} from 'react-native-ios-kit';
import { Card, ListItem, Container } from 'react-native-elements'
import { DynamicCollage, StaticCollage } from "react-native-images-collage";
//import { ReactPhotoCollage } from "react-photo-collage";
import {imgs} from '../closet/AddItemForm'
import userDetails from '../userDetails';
import {listCheck} from '../dressingroom/runway'
import { readPic } from '../closet/items';
import Gallery from "react-photo-gallery";
let obj2 = '';
let top = '';
let bottom = '';
let accessory = '';
let shoes = '';
let topLayer = '';
let readPics = []
let checkOutfit = []
let returned_outfits = [];

const photos = [
   'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconsdb.com%2Fblack-icons%2Fsquare-icon.html&psig=AOvVaw1nb-7_absezjEGPlto_LTJ&ust=1639623507200000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjmv9fn5PQCFQAAAAAdAAAAABAE',
   'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconsdb.com%2Fblack-icons%2Fsquare-icon.html&psig=AOvVaw1nb-7_absezjEGPlto_LTJ&ust=1639623507200000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjmv9fn5PQCFQAAAAAdAAAAABAE',
   'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconsdb.com%2Fblack-icons%2Fsquare-icon.html&psig=AOvVaw1nb-7_absezjEGPlto_LTJ&ust=1639623507200000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjmv9fn5PQCFQAAAAAdAAAAABAE',
   'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconsdb.com%2Fblack-icons%2Fsquare-icon.html&psig=AOvVaw1nb-7_absezjEGPlto_LTJ&ust=1639623507200000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjmv9fn5PQCFQAAAAAdAAAAABAE',
   'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconsdb.com%2Fblack-icons%2Fsquare-icon.html&psig=AOvVaw1nb-7_absezjEGPlto_LTJ&ust=1639623507200000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjmv9fn5PQCFQAAAAAdAAAAABAE'

     
  ]
  const photos2 = [
    'https://images.urbndata.com/is/image/UrbanOutfitters/63248462_049_d?$xlarge$&fit=constrain&qlt=80&wid=640' ,
     'https://i.ebayimg.com/images/g/q~QAAOSwCwJfeDFo/s-l400.jpg' ,
      'https://n.nordstrommedia.com/id/sr3/0ba58f2f-ca87-46f0-8b01-cc32261a6a3c.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838' 
      
   ]

const data = [
    {
        photos: ['https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2021%2F07%2Fnike-dunk-high-womens-sneakers-aluminum-baby-blue-white-price-release-date-1.jpg?q=75&w=800&cbr=1&fit=max' ,
                'https://lsco.scene7.com/is/image/lsco/290370014-front-pdp?$qv_desktop_bottoms$' ,
                'https://di2ponv0v5otw.cloudfront.net/posts/2020/08/01/5f25afd9284e99d2de7607c3/m_5f25afec163df4604b30a4ca.jpg'],
        name: "Outfit1"
    },
    {
        photos: [
            'https://images.urbndata.com/is/image/UrbanOutfitters/63248462_049_d?$xlarge$&fit=constrain&qlt=80&wid=640' ,
             'https://i.ebayimg.com/images/g/q~QAAOSwCwJfeDFo/s-l400.jpg' ,
              'https://n.nordstrommedia.com/id/sr3/0ba58f2f-ca87-46f0-8b01-cc32261a6a3c.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838'],
        name: "Outfit2"
    }

]
const photos3 = [
    {
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAElBMVEX8/vz///8pKikAAAAtLS2Oj47hKWeDAAABEElEQVR4nO3PBxEDMRAAMZcLf8p5GuuRGGjdO+dhc9f97afNmr1ets86hm2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2Gfd9w9ttm3Tkvm/sHIDIKk6RLvD4AAAAASUVORK5CYII=',
      width: 1,
      height: 1
    },
    {
      src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAElBMVEX8/vz///8pKikAAAAtLS2Oj47hKWeDAAABEElEQVR4nO3PBxEDMRAAMZcLf8p5GuuRGGjdO+dhc9f97afNmr1ets86hm2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2Gfd9w9ttm3Tkvm/sHIDIKk6RLvD4AAAAASUVORK5CYII=',
      width: 1,
      height: 1
    },
    {
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAElBMVEX8/vz///8pKikAAAAtLS2Oj47hKWeDAAABEElEQVR4nO3PBxEDMRAAMZcLf8p5GuuRGGjdO+dhc9f97afNmr1ets86hm2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2Gfd9w9ttm3Tkvm/sHIDIKk6RLvD4AAAAASUVORK5CYII=',
        width: 1,
        height: 1
      },
      {
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAElBMVEX8/vz///8pKikAAAAtLS2Oj47hKWeDAAABEElEQVR4nO3PBxEDMRAAMZcLf8p5GuuRGGjdO+dhc9f97afNmr1ets86hm2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2Gfd9w9ttm3Tkvm/sHIDIKk6RLvD4AAAAASUVORK5CYII=',
        width: 1,
        height: 1
      },
      {
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAElBMVEX8/vz///8pKikAAAAtLS2Oj47hKWeDAAABEElEQVR4nO3PBxEDMRAAMZcLf8p5GuuRGGjdO+dhc9f97afNmr1ets86hm2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2Gfd9w9ttm3Tkvm/sHIDIKk6RLvD4AAAAASUVORK5CYII=',
        width: 1,
        height: 1
      }
  ];

const setting = {
    width: '300px',
    height: ['100px', '100px'],
    layout: [1, 4],
    photos: [
      { source: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2021%2F07%2Fnike-dunk-high-womens-sneakers-aluminum-baby-blue-white-price-release-date-1.jpg?q=75&w=800&cbr=1&fit=max' },
      { source: 'https://lsco.scene7.com/is/image/lsco/290370014-front-pdp?$qv_desktop_bottoms$' },
      { source: 'https://di2ponv0v5otw.cloudfront.net/posts/2020/08/01/5f25afd9284e99d2de7607c3/m_5f25afec163df4604b30a4ca.jpg' },
    ],
    showNumOfRemainingPhotos: true
  };

export default class Outfits extends Component {


    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: true,
            imageURI: null,
            outfitData: null,
            name: '',
            none: '',
        }
        console.log(userDetails)
        this.fetchData();
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

//    fill_result = () => {
//
//        for (var i = 0; i < userDetails.savedOutfits.length; i++) {
//
//                    var requestOptions = {
//                                method: 'GET',
//                                redirect: 'follow'
//                              };
//                              var query = "email=" + userDetails.email + "&name=" + userDetails.savedOutfits[i];
//                              fetch("http://localhost:8080/getOutfitDetails?" + query, requestOptions)
//                                .then(response => response.text())
//                                .then(result => {
//                                    returned_outfits.push(JSON.parse(result));
//                                    //this.renderOutfitCard()
//                                    //Check array length for outfit size
//                                })
//                                .catch(error => console.log('error', error));
//                }
//    };

    fetchOutfits = async() => {
        var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                await Promise.all(
                  userDetails.savedOutfits.map(async (outfit) => {
                    var exists = false;
                    for (var i = 0; i < returned_outfits.length; i++) {
                        if (returned_outfits[i].name == outfit) {
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        var query = "email=" + userDetails.email + "&name=" + outfit;
                        const response = await fetch("http://localhost:8080/getOutfitDetails?" + query, requestOptions)
                        const result = await response.text()
                        returned_outfits.push(JSON.parse(result));
                    }
                  })
                )
    }

    fetchData() {
        var outfits = []
        this.fetchOutfits().then(() => {
            console.log(returned_outfits);
            for (var i = 0; i < returned_outfits.length; i++) {
                console.log(returned_outfits[i]['top']['uri']);
                var outfit = {
                    'name': returned_outfits[i]['name'],
                    'items': [returned_outfits[i]['top'], returned_outfits[i]['bottom'], returned_outfits[i]['topLayer'], returned_outfits[i]['shoes'], returned_outfits[i]['accessory'] ],
                    'uris': [returned_outfits[i]['top']['uri'], returned_outfits[i]['bottom']['uri'], returned_outfits[i]['topLayer']['uri'], returned_outfits[i]['shoes']['uri'], returned_outfits[i]['accessory']['uri']]
                };
                outfits.push(outfit);
            }
        }).then(() => {
            setTimeout(() => this.setState({ isLoading: false, outfitData: outfits }), 2000);
            //console.log(this.state.outfitData);
        });
    };

//    componentDidMount() {
//
//        console.log(imgs[0]);
//        for(var i = 0; i < imgs.length; i++){
//            for(var j = 0; j < imgs[i].length; j++){
//                console.log(imgs[i][j]);
//                this.getImageFromStorage(imgs[i][j]);
//
//            }
//        }
//        var requestOptions = {
//            method: 'GET',
//            redirect: 'follow'
//          };
//          var query = "email=" + userDetails.email;
//          if(this.props.route.params == undefined){
//            console.log(this.props.route.params)
//            return
//        }
//          var name1 = "&name=" + this.props.route.params.name;
//          fetch("http://localhost:8080/getOutfitDetails?" + query + name1, requestOptions)
//            .then(response => response.text())
//            .then(result => {
//                console.log(result)
//                obj2 = JSON.parse(result)
//                console.log(obj2)
//                top = obj2.top.uri
//                console.log(top)
//                bottom = obj2.bottom.uri
//                shoes = obj2.shoes.uri
//                accessory = obj2.accessory.uri
//                topLayer = obj2.topLayer.uri
//                readPics.push({src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8AAAD8/Pz5+fkFBQXDw8Pn5+c5OTliYmL29vZ5eXlra2vq6urQ0NAICAiCgoJJSUnW1ta8vLzZ2dmqqqqjo6Pw8PBbW1sPDw+1tbUyMjIrKyvKysrh4eElJSVvb2+bm5saGhpcXFwgICCLi4tOTk4/Pz+IiIh+fn6WlpYWFhY8PDwTwkyZAAAKPklEQVR4nO2ai3LivA6AfYGAgQAhYBIgQFvohX3/9zuSbCchF7o7w3+6O6OvnRZix7YsWZYvQjAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAM839HVf+1Vu3k9qO7F5XL1JcLEjBN1Sp6WAN9CcU9KhbK7WhtO2OZSWlXfOMtX2HHe5RgtC9CuQJ6JXBFdOSpC6F8SaKS8pEU/X3fwCinOm2ManW0NqKz83W9qx/VpY3Wutb8+8R2+yG/oK5TDzQIje4yt87a8S/V75vR0ckausA0nomQWRlDetSkpw5cTswT7K+VWNlRo9FUbGepodjfENIYoWZOOFJhBx1PjfJ26i1JPDAn16AeKwW7qWp1bYdH3qRco/pK/R0luteVBWYWs2NtzW7EunSHDo0Obewdf7WWiz8YNe6N7wSoNPkYmx7y83R6mnzlcWqx6Y32mjSJo84a4OUojaOgIRUVUTfWeT0YBipK75NmUVFEtrJSU6RQSmHL4a1s2l1oFIHx9Ridbx7+FvliJ0veP1ap9obku12Y8/G4m65aHgIzmNVp9HaNcKBqofPFdNzF63ixmQmnQn1pJE7H2/FkUwQbFskHPYYXsAFamOGlu9Tx+HQueqcfrM1gcZstCjbwAuL/7aaAbkMTpO7RIh1h0ujQKEDjTzTGtAT1ruwmk/18zryadp3JJxQRfYoYugzjmbMfnY8elDqOH5ip0lasryDTYDCfo3TzAXyE79nrCganpcGFxpfsSfJrywag8OEN03Lq7vVRzkPNgwH9hg/zm5Rf/r0RVghPy7xz+rwAQyVrHzqJpiShFcVVzueDslQ58H/xA7R72u8CNPTY5EivQYVBifAOfN59ohPBQYMdBBLOZSZvaVNC6PIV1bchY57IedlqKpZa7roNJFxGykuITwZV3owafEzRJCHLnYRare5LJcF832XYo8kjFY6D5uD/2/K6p/6c43uDV/Se3rOnICG2aN2UEJxrJaEqtlRpaAp1le98NAy5HwYdzv2zWl/A1wNqTDQkNGojs6zK67rMFwCNymRz8NSYbWWwql9DYYpI282yrHGqnYggI0hIxrtulmDAt0hnpSBvsayNjxuINBjIOvO1CTq8U0tgjQMbqruTUJAaqjJA2MarZ9snoNnKNznA7hmH3gMTSUakVmfg2kU7ICG2NstbZiCEkzAmtxoPizhxpFuyRDmJ00Max3GSJodEBx2S5K+HkDemtw6WgoiGDoUukjT1OZPzUaKEyzw9JPBL5XZOY8QHaXwgjwsrytgZfPPixVm7/AgLgtSb76alQhyHSCqqxYPj4kzhU7tJycUmYRySkZxaLfJh/72Ed2HG4Z2ado1pDSREKzbxPY+hls73MgNdybe1wO/VfGu+Xpy971Z+1ZPuqNfbVqqFl7A92hfOhCYdLRi5MdiVRNxL2E4ayGXc82opIsyEYEbgH+EXNBg8CqXBFHfJ0DEM5Mk7v8RNUH8s4aBXwj7hnyQhWKJWeXAoEfr82pQCVlG80hwl97lLSZwOm77079WhgR8QAvwJePADzXqVsZMJ5zs/iiyN/X9Oh9iwg/MdckpRhK5H6OA/9IkCHbmjES18TPPv6BCV+EUzvXyJ3SKrZqa0tsiPNGXLDfmrZP+P6VALO8Oct7ncC+/Dy1kTFzla26ULHj4KDFzSf20c4jB0Qaz86qtl4gLcXYoZ0uOzJcTyThhRILiGqS8QniJh7D1pK0oJfPklARal0mdbaTNku138Su1ZEmqMtUgtRV+W1c1peYhWnD7f07gO9ODSqSbOM2Z8sfZlt/YrAsmLJBEPFNM8W4flAojA2HhX20F4goQYL7viRZ+ExYsbiDFmeLoO3dKxXJLigu2rSn+ahFiB6dvliF9cH8QY4zx9thjI2grf8fFUCZUKVlr06XBFK1nUof0PojYyj/dNYP2Vnw/VLupTPE0qM/Klw3YD3My4zijkyXCLyeA4BJsCHSpd32rUEAutaLj+8YyPSXiQQChzt5P8FE9T+AEwaVuptjg5nZwr3aX3EtK+/90xTtBhs5wfnfGh5OiKlczlUbT2y3Hzwpil28460SYnzvheh/VTKfpUStho78/GNLCWODt/doubA1HTzgzGpbg83mgf09D0f6FVfU0WmKbX1Nq0U4c/t7bAnQLnpdtbCRZWUtpM3S7L24E6IB051zumkVfXorKfJOFfZqUoYYH7bBh4tvbiLIiQ72nfVE5mtFyMxk7C99n9kQYuHd+9Dps++Ud1SIcHa9eR82ljqwo3utNXF1cdc2w4DMsL7XDJ21m49XMpoclD9PdX6ZAOHFGJ2OqXs1XuiaA9YDxNWviVx8kKdzpIYSxk3qboQE11qBVtneztY7MfXh+iO8lxExTm9f0az6eMP2fHpcz5NsctbvlrGEwvRdcL3vS2KHDCLM85oyntrcqFaAVHPzxboJ3ZyQBCXtxO/LBqRnJbfK4nLxAnwih82VROZUMRTiazT0sxgVvrmLHM6NCkaB6e/vQ4JGmE3Uq/834tRHnAG+8g3IFCMjmtvQI2fXOh5MiFQTg+83d/qDLpOIT+4b022n2hc4ubO0lZFlrPCqvzK8U6uNV/srZ2fH54JxEpzrmsImUPkzeqDHzuLpwI/DUSuvN/dBlbdCBzOruQo9ftXvrTK/i/FffeIx+hDrOsvj6/obrl9QBmr5rXD354xhdu4jb2440iTjr8oqFGEz1MkwtbvzOBtxlWV38glmU+Hy3w5tsDeKrWHaMf1qFruUKPs176iWBQHrCCDNdcC3eHxb+B12WK7dFvPwQdwmv7j9TfqGnUsfBnT+FyU63yX5K69ZGE83KuaiUNnIQ9ZzL3clJ8kpyv87Bv4pt+PaftVSM4z2JzzVwkFLJmk1VHR3sJnQ51/UYIxRrfWulq53WodDNU8uolCVuJLZS7pWTifFG7CrD8zFPd6h93+cqk60ntmsHyYxj1XpD5OO6Bty9/TSqUgx/GO+Tt0neX6bA97o/73Wfk57W6hFdMehsnpMNv7/BonObxnN8WdJ9merrkhwIdo7KNduNRKc6ByqaH9WV6mizOwyS1WITurieKU4LipeoxHnvF7lg06u4bmLfSBF6MCw0xciOPSTAJam6rt4PaTTIMZvBSlKF+MaatGHem727ZWMoKX4zpv+elwyUwravS3CFq+Pp9E1uXgZzz03QH8vvXBYXZ/raZtqaStzW5VSeojetduvdCkgrX3e6Lw694/an3qhqmUKOMuyjXWXJ5uegbfIfoMqvylwBbt8lIELxMF9puSM82Er2XrnA+Ms7H1s1UmdJFP2ofDZOOOYjmOHd/TP2OhKqyg9LYqh5q5iVV18/OH9hoKMvdLCwf6KAWfK3nVbzyEC6Dts3UZcDUB9fZGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhmAb/AzEUg43AyfxeAAAAAElFTkSuQmCC', width: 0.5, height: 0.5})
//                readPics.push({src: top, width: 0.5, height: 0.5})
//                readPics.push({src: bottom, width: 0.5, height: 0.5})
//                readPics.push({src: shoes, width: 0.5, height: 0.5})
//                readPics.push({src: accessory, width: 0.5, height: 0.5})
//                readPics.push({src: topLayer, width: 0.5, height: 0.5})
//                console.log(readPics)
//                //this.renderOutfitCard()
//                //Check array length for outfit size
//
//            })
//            .catch(error => console.log('error', error));
//
//    }

    getImageFromStorage(imageName) {
        let imageRef = firebase.storage().ref('/' + imageName);
        imageRef
          .getDownloadURL()
          .then((url) => {
            //from url you can fetched the uploaded image easily
           // this.setState({ imageURI: url });
          })
          .catch((e) => console.log('getting downloadURL of image error => ', e));
    }

    renderOutfitCard = () => {
        if(readPics.length == 0){
            const h = photos.map(index => {
                return <img key={index} src={index} onClick={() => imageClick()}/>});
                return photos3
        }
        else{
           // const images = readPics.map(index => {
            //    return <img key={index} src={index} onClick={() => imageClick()}/>
            // }); 
             return readPics
        }
                       
    };

    outfitCard(item) {
            return (<Card style={{ flex: 1 }}>
                <Card.Title>{item.name}</Card.Title>
                <StaticCollage
                          width={325}
                          height={325}
                          images={ item.uris }
                          matrix={[3, 2]}
                          />
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Button
                        style={{ margin: 5 }} centered rounded>
                        Delete Outfit
                    </Button>
                    <Button
                        onPress={() => this.props.navigation.navigate('OutfitView', { name: item.name, URIs: item.uris })}
                        style={{ margin: 5 }} centered rounded>
                        View Outfit
                    </Button>
                </View>
            </Card>);
    }
    
    render() {
        //const images = readPics.map(index => {
       //     return <img key={index} src={index} onClick={() => imageClick()}/>
        // }); 
        // console.log(images)
         console.log(readPics)

        var list;
        if (this.state.isLoading) {
            list = <Spinner />
        } else {
            list = <FlatList
                                                   data = {this.state.outfitData}
                                                   renderItem={({item}) => this.outfitCard(item)}
                                                   keyExtractor={(item, index) => `${item}_${index}`}
                                                 />
        }
        return(
            <View style={styles.container}>
                 {list}
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
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center'
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
    },
    image: {
        flex: 1,
        width: 50,
        height: 50,
        resizeMode: 'contain'
      }
})
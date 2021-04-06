import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text, Content, Button, Card, CardItem, Left, Right, Icon} from 'native-base';
import Footers from '../Footers';
import axios from 'axios';

class Masakan extends Component {

    constructor() {
        super();
        this.state = {
            jenisMasakan: [],
            dataRestoran: []
        }
    }

    getJenisMasakan = () => {
        axios.get('https://developers.zomato.com/api/v2.1/cuisines?city_id=74', {
            headers: {'user-key' : '390c75feec0272b475133b2d1ebe18df'}
        }).then(response => {
            this.setState({
                jenisMasakan: response.data.cuisines
            })
        })
    }

    getDataRestoran = () => {
        axios.get('https://developers.zomato.com/api/v2.1/search?start=30&count=10', 
            {headers:{'user-key':'390c75feec0272b475133b2d1ebe18df'}})
            .then((response)=>{
                this.setState({
                    dataRestoran: response.data.restaurants
                })
            })
    }

    componentDidMount() {
        this.getJenisMasakan();
        this.getDataRestoran();
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Content>
                <Text style={{marginTop:20, marginLeft:10}}>Jenis Masakan</Text>
                <Content horizontal style={{marginTop:20, marginLeft:10}}>
                    {this.state.jenisMasakan.map((data,key)=>{
                        return (
                            <View key={key}>
                                <Button style={{margin:10}}>
                                    <Text>{data.cuisine.cuisine_name}</Text>
                                </Button>
                            </View>
                        );
                    })}
                </Content>
                <Text style={{marginTop:20, marginLeft:10}}>Restoran</Text>
                <Content horizontal style={{marginTop:20, marginLeft:10}}>
                    {this.state.dataRestoran.map((data,key)=>{

                        var imageURI = '';
                        if (data.restaurant.thumb === '') {
                            imageURI = 'https://placeimg.com/640/640/people';
                        } else {
                            imageURI = data.restaurant.thumb
                        }

                        return (
                            <TouchableOpacity 
                                key={key}
                                onPress={() => {
                                    this.props.navigation.navigate('Restoran', {
                                        nama_restoran: data.restaurant.name,
                                        res_id: data.restaurant.R.res_id
                                    })
                                }}
                            >
                            <Card style={{width:300}}>
                                <CardItem>
                                    <Left>
                                        <Text>{data.restaurant.name}</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="home" />
                                    </Right>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image 
                                        style={{height:200, width:null, flex:1}}
                                        source={{uri: imageURI}} 
                                    />
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text>Jenis Masakan</Text>
                                    </Left>
                                    
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text>{data.restaurant.cuisines}</Text>
                                    </Left>
                                </CardItem>
                            </Card>
                            </TouchableOpacity>
                        );
                    })}
                </Content>
                </Content>
                <Footers navigation={this.props.navigation} />
            </View>
        );
    }
}

export default Masakan;
import React, {Component} from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Content, Card, CardItem, Body, Text } from 'native-base';
import axios from 'axios';

class RestoranKota extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataRestoran: [],
            idKota: this.props.id_kota
        }
    }

    getDataRestoran() {
        axios.get('https://developers.zomato.com/api/v2.1/search?entity_id='+this.state.idKota+'&entity_type=city', {
            headers:{'user_key':'390c75feec0272b475133b2d1ebe18df'}
        }).then(response=>{
            this.setState({
                dataRestoran: response.data.restaurants
            })
        })
    }

    componentDidMount() {
        this.getDataRestoran();
    }

    render() {
        return (
            <Content>
                {this.state.dataRestoran.map((data,key)=>{
                    return (
                        <View>
                        <TouchableOpacity 
                            key={key}
                            onPress={() => {
                                this.props.navigation.navigate('Restoran', {
                                    nama_restoran: data.restaurant.name,
                                    res_id: data.restaurant.R.res_id
                                })
                            }}
                        >
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>{data.restaurant.name}</Text>
                                    <Text note>{this.props.nama}</Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Image
                                    style={{height: 250, width: null, flex:1}}
                                    source={{uri: data.restaurant.thumb}}
                                />
                            </CardItem>
                        </Card>
                        </TouchableOpacity>
                        </View>
                    );
                })}
            </Content>
        );
    }
}

export default RestoranKota;
import React, {Component} from 'react';
import { View, Image } from 'react-native';
import { Content, Card, CardItem, Body, Text, Button, Container } from 'native-base';
import Footers from '../Footers';
import axios from 'axios';

class Kategori extends Component {

    constructor() {
        super();
        this.state = {
            dataKategori: [],
            dataCollections: []
        }
    }

    getDataKategori = () => {
        axios.get('https://developers.zomato.com/api/v2.1/categories', 
            {headers:{'user-key':'390c75feec0272b475133b2d1ebe18df'}})
            .then((response)=>{
                this.setState({
                    dataKategori: response.data.categories
                })
            })
    }

    getDataCollections() {
        axios.get('https://developers.zomato.com/api/v2.1/collections?city_id=74', 
            {headers:{'user-key':'390c75feec0272b475133b2d1ebe18df'}})
            .then((response)=>{
                this.setState({
                    dataCollections: response.data.collections
                })
            })
    }

    componentDidMount() {
        this.getDataKategori();
        this.getDataCollections();
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Container style={{flex:3}}>
                <Content>
                    {this.state.dataCollections.map((data,key)=>{
                        return (
                            <Card key={key}>
                                <CardItem cardBody>
                                    <Image 
                                        style={{height: 200, width: null, flex: 1}}
                                        source={{uri: data.collection.image_url}}
                                    />
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>{data.collection.title}</Text>
                                        <Text note>{data.collection.description}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        );
                    })}
                </Content>
                </Container>

                <Container style={{flex:1}}>
                <Text style={{margin:10}}>Kategori</Text>

                <Content horizontal>
                {this.state.dataKategori.map((data,key)=>{
                    return (
                        <Button key={key} style={{margin:10}}>
                            <Text>{data.categories.name}</Text>
                        </Button>
                    );
                })}
                </Content>
                </Container>

                <Footers navigation={this.props.navigation} />
            </View>
        );
    }
}

export default Kategori;
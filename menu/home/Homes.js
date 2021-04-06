import React, {Component} from 'react';
import { View, StatusBar, Image, TouchableOpacity } from 'react-native';
import Footers from '../Footers';
import ImageSlider from 'react-native-image-slider';
import { Content, Text, Button, Card, CardItem, Left, Icon, Right } from 'native-base';
import axios from 'axios';

class Homes extends Component {

    constructor() {
        super();
        this.state = {
            images: [
                // 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indozone.id%2Ffood%2FmnsBJb%2Fmembuat-martabak-daging-yang-gurih-dan-bikin-nagih&psig=AOvVaw3CrmMgW8nXq9iiUIni8zUe&ust=1588556509216000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPjY5bfIlukCFQAAAAAdAAAAABAU',
                // 'https://www.google.com/url?sa=i&url=https%3A%2F%2Flifestyle.okezone.com%2Fread%2F2018%2F05%2F03%2F298%2F1894003%2F3-tempat-beli-martabak-manis-enak-tapi-mahal-di-jakarta&psig=AOvVaw1iy2vjEe5C1xTAiSjOE6cF&ust=1588556666001000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLiIovnIlukCFQAAAAAdAAAAABAK',
                // 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.dapurkobe.co.id%2Fmartabak-manis&psig=AOvVaw1tr-fOBI0c24Mpd5NT8DUT&ust=1588556801924000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjO7bbJlukCFQAAAAAdAAAAABAV',
                // 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tokopedia.com%2Fsedapmantapcoy%2Fmartabak-telor&psig=AOvVaw2Q74gtnoTEk6uQqIFxzPW3&ust=1588556952606000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJC2kP3JlukCFQAAAAAdAAAAABAJ'
                'https://placeimg.com/640/640/nature',
                'https://placeimg.com/640/640/people',
                'https://placeimg.com/640/640/animals',
                'https://placeimg.com/640/640/beer',
            ],
            dataKategori: [],
            dataRestoran: []
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

    getDataRestoran = () => {
        axios.get('https://developers.zomato.com/api/v2.1/search?start=6&count=10&sort=rating', 
            {headers:{'user-key':'390c75feec0272b475133b2d1ebe18df'}})
            .then((response)=>{
                this.setState({
                    dataRestoran: response.data.restaurants
                })
            })
    }

    componentDidMount() {
        this.getDataKategori();
        this.getDataRestoran();
    }

    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor="#3d51b4" />

                <Content>

                {/* Image Slider */}
                <View style={{ height: 150 }}>
                    <ImageSlider images={this.state.images} autoPlayWithInterval={3000} />
                </View>

                {/* Kategori */}
                <Text style={{marginTop:20, marginLeft:10}}>Pilihan Kategori</Text>
                <Content horizontal style={{marginTop:20}}>
                    {this.state.dataKategori.map((data,key)=>{
                        return (
                            <Button rounded key={key} style={{margin:10}}>
                                <Text>{data.categories.name}</Text>
                            </Button>
                        )
                    })}
                </Content>

                {/* Restoran Terbaik */}
                <Text style={{marginTop:20, marginLeft:10}}>Restoran Terbaik</Text>
                
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
                        <Card>
                            <CardItem>
                                <Text>{data.restaurant.name}</Text>
                            </CardItem>
                            <CardItem cardBody>
                                <Image 
                                    style={{height:200,width:null,flex:1}} 
                                    source={{uri: imageURI}} 
                                />
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Icon style={{color:'#ff8000'}} name="star" />
                                    <Text>{data.restaurant.user_rating.aggregate_rating}</Text>
                                </Left>
                                <Right>
                                    <Text>{data.restaurant.user_rating.rating_text}</Text>
                                </Right>
                            </CardItem>
                        </Card>
                        </TouchableOpacity>
                    )
                })}
                

                </Content>

                <Footers navigation={this.props.navigation} />
            </View>
        );
    }
}

export default Homes;
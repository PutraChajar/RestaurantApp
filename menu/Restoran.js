import React, {Component} from 'react';
import {View, Image, Alert} from 'react-native';
import Footers from './Footers';
import { Content, Card, CardItem, Left, Right, Icon, Text } from 'native-base';
import axios from 'axios';

class Restoran extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailRestoran: [],
            resID: this.props.route.params.res_id
        }
    }

    getDetailRestoran() {
        axios.get('https://developers.zomato.com/api/v2.1/restaurant?res_id='+this.state.resID,
        {headers:{'user-key':'390c75feec0272b475133b2d1ebe18df'}})
        .then(response => {
            this.setState({
                detailRestoran: response.data
            })
        })
    }

    componentDidMount() {
        this.getDetailRestoran();
    }

    render() {
        var alamat = {...this.state.detailRestoran.location};
        var rating = {...this.state.detailRestoran.user_rating};
        return (
            <View style={{flex:1}}>
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <Image 
                                style={{height:240, width:null, flex:1}}
                                source={{uri: this.state.detailRestoran.featured_image}} 
                            />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Alamat Restoran : {alamat.address}</Text>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Icon name='star' style={{backgroundColor:'#ff8000'}} />
                                <Text>{rating.aggregate_rating}</Text>
                            </Left>
                            <Right>
                                <Icon name='chatbubbles' />
                                <Text>{this.state.detailRestoran.all_reviews_count}</Text>
                            </Right>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem>
                            <Left>
                                <Text>Jenis Masakan : {this.state.detailRestoran.cuisines}</Text>
                            </Left>
                        </CardItem>
                    </Card>
                </Content>
                <Footers navigation={this.props.navigation} />
            </View>
        );
    }
}

export default Restoran;
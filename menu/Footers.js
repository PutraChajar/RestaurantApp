import React, {Component} from 'react';
import {Footer, FooterTab, Button, Icon, Text} from 'native-base';

class Footers extends Component {
    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button vertical onPress={() => this.props.navigation.navigate('Homes')}>
                        <Icon name="apps" />
                        <Text>Home</Text>
                    </Button>
                    <Button vertical onPress={() => this.props.navigation.navigate('Masakan')}>
                        <Icon name="pizza" />
                        <Text>Masakan</Text>
                    </Button>
                    <Button vertical onPress={() => this.props.navigation.navigate('Kota')}>
                        <Icon name="home" />
                        <Text>Kota</Text>
                    </Button>
                    <Button vertical onPress={() => this.props.navigation.navigate('Kategori')}>
                        <Icon name="grid" />
                        <Text>Kategori</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

export default Footers;
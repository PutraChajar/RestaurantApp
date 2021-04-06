import React, {Component} from 'react';
import {Container, ScrollableTab, Tabs, Tab} from 'native-base';
import RestoranKota from './RestoranKota';
import Footers from '../Footers';

class Kota extends Component {
    render() {
        return (
            <Container>
                <Tabs renderTabBar={()=> <ScrollableTab />}>
                    <Tab heading="Jakarta">
                        <RestoranKota nama="Jakarta" id_kota="74" navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading="Bandung">
                        <RestoranKota nama="Bandung" id_kota="11052" navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading="Bali">
                        <RestoranKota nama="Bali" id_kota="170" navigation={this.props.navigation} />
                    </Tab>
                </Tabs>

                <Footers navigation={this.props.navigation} />
            </Container>
        );
    }
}

export default Kota;
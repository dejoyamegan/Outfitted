import { Button, Collection, SegmentedControl, RowItem, TabBar} from 'react-native-ios-kit';
import React, {Component} from 'react';

export default class NavBar extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    selectTab(name) {
        this.props.navigation.navigate(name);
    }

    render() {
        return(
            <TabBar
              tabs={[
                {
                  icon: 'ios-shirt',
                  title: 'Closet',
                  onPress: this.selectTab('Closet'),
                  isActive: this.state.activeTab === 0,
                },
                {
                  icon: 'ios-flash',
                  title: 'Dressing Room',
                  onPress: this.selectTab('DressingRoom'),
                  isActive: this.state.activeTab === 1,
                },
                {
                  icon: 'ios-body',
                  title: 'Outfits',
                  onPress: this.selectTab('Outfits'),
                  isActive: this.state.activeTab === 2,
                },
              ]}
            />
        );
    }
}
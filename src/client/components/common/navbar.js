import { Button, Collection, SegmentedControl, RowItem, TabBar} from 'react-native-ios-kit';
import React, {Component} from 'react';

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    selectClosetTab = () => {
        this.props.navigation.navigate('Closet');
    }

    selectDressingRoomTab = () => {
        this.props.navigation.navigate('DressingRoom');
    }

    selectOutfitsTab = () => {
        this.props.navigation.navigate('Outfits');
    }

    render() {
        return(
            <TabBar
              tabs={[
                {
                  icon: 'ios-shirt',
                  title: 'Closet',
                  onPress: this.selectClosetTab,
                  isActive: this.state.activeTab === 0,
                },
                {
                  icon: 'ios-flash',
                  title: 'Dressing Room',
                  onPress: this.selectDressingRoomTab,
                  isActive: this.state.activeTab === 1,
                },
                {
                  icon: 'ios-body',
                  title: 'Outfits',
                  onPress: this.selectOutfitsTab,
                  isActive: this.state.activeTab === 2,
                },
              ]}
            />
        );
    }
}
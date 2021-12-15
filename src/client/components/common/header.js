import { Toolbar, Icon, Button, Collection, SegmentedControl, RowItem, TabBar} from 'react-native-ios-kit';
import React, {Component} from 'react';

export default class Header extends Component {

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
            <Toolbar
              items={[
                {
                  icon: 'ios-arrow-back',
                  onPress: this.runAction,
                },
                {
                  icon: 'ios-arrow-forward',
                  onPress: this.runAction,
                },
                {
                  icon: 'ios-refresh',
                  onPress: this.runAction,
                },
                {
                  icon: 'ios-share-outline',
                  onPress: this.runAction,
                  disabled: true,
                },
              ]}
            />
        );
    }
}
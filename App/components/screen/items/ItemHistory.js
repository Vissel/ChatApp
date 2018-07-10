import React, { Component } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet, Button,
    Image, FlatList
} from 'react-native'

class ItemHistory extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const isOnline = this.props.isOnline
        const { navigation } = this.props
        let imageOnline;
        if (isOnline) {
            imageOnline = <Image
                style={{ width: 6, height: 6, borderRadius: 3, marginTop: 13, marginLeft: 5 }}
                source={require('../../../components/img/icon_online.png')} />
        }
        return (
            <View style={style.item}>

                <Image
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                    source={{ uri: this.props.imageURL }} />
                <View style={style.info}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={style.txtName}>{this.props.name}</Text>
                        {imageOnline}
                        {/* <Text>{this.props.isOnline}</Text> */}
                    </View>
                    <Text>{this.props.context}</Text>
                </View>
            </View>
        );
    }
}
const style = StyleSheet.create({
    swipeStyle: {
        backgroundColor: 'white'
    },
    item: {
        flexDirection: 'row',
        padding: 8,
    },
    info: {
        marginLeft: 10
    },
    txtName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    }
});

export default ItemHistory
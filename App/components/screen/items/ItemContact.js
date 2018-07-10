import React, { Component } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet, Button,
    Image, FlatList
} from 'react-native'

class ItemContact extends Component {
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
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/chatapp-98d0e.appspot.com/o/messageImages%2Fok.jpg?alt=media&token=c09f2f3c-cc8d-46fa-b7ac-ef1fedf13e46' }} />
                <View style={style.info}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={style.txtName}>{this.props.name}</Text>
                        {imageOnline}
                    </View>
                </View>
            </View>
        );
    }
}
const style = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 8,
    },
    info: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    txtName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    }
});

export default ItemContact
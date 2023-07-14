import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    Box,    
} from "native-base";
import watch from "redux-watch";
import { Observable } from "rxjs";
import Store from "../../redux/Store";
import { TouchableOpacity } from "react-native";


export default function Left_Buttons({ iconUri, clearChatMessages }) {    

    const [botTyping, setBotTyping] = useState(false);


    useEffect(() => {
        let chatWatch = watch(Store.getState, 'chat');

        const storeObservable$ = Observable.create(observer => {
            Store.subscribe(chatWatch((newData) => {
                observer.next(newData);
            }));
        });

        const observableStore$ = storeObservable$.subscribe(async newData => {            
            if (newData.botTyping != botTyping) {
                setBotTyping(newData.botTyping);
            }            
        });

        return () => {
            observableStore$.unsubscribe();
        }

    }, [botTyping])

    return (
        <Box style={{
            width: 45,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
            marginTop: 0
        }}>
            <TouchableOpacity disabled={botTyping} onPress={() => clearChatMessages()}>
                <View
                    alignSelf={"center"}
                    width={35} height={35} background={"white"}
                    borderRadius={100} justifyContent={"center"} alignItems={"center"}
                    opacity={(botTyping == true) ? 0.5 : 1.0}
                >
                    <Image source={iconUri} alt="Clean chat" width={25} height={25} />
                </View>
            </TouchableOpacity>
        </Box>
    )
}
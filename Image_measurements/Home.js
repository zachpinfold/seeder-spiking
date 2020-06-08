import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import {NativeRouter, Switch, Route, Link} from 'react-router-native'

function Home({history}) {

    const [count, setCount] = useState(0)

    
    return (
    <View>
        <Button title="inc count" onPress={() => {setCount(count + 1)}}/>
        <Text>{count}</Text>
        <Link to={'/picture'}>
            <Text>Picture Test</Text>
        </Link>
        {/* <Button title="click me" onPress={() => history.push('/products')}/> */}
    </View>
    )
}

export default Home;
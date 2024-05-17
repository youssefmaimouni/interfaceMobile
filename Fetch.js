import React, { PureComponent } from 'react'
import { Button, Text, View } from 'react-native'

export class Fetch extends PureComponent {
    state={
        data:{'activity':'loading...'}
    }

    getJsonData=()=>{
        fetch('http://127.0.0.1:8000/api/filiere/',{method:'GET'}).then((response)=>response.json()).then((responseJson)=>{
            console.log(responseJson);
            setData(responseJson);
          }).catch((error)=>{console.log('error:'+error);})
    }
  render() {
    return (
      <View>
        <Button title='press me' onPress={this.getJsonData} />
      </View>
    )
  }
}

export default Fetch

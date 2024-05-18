import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Example = () => {
  return (
    <View style={tw`p-4 bg-blue-100`}>
      <Text style={tw`text-lg text-blue-800`}>Hello, Tailwind!</Text>
    </View>
  );
};

export default Example;

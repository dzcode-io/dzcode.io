
// import react native
import React, {FC} from 'react';
import {Text, View} from 'react-native';

// define Card props interface
interface CardProps {}

// export Card component
const Card: FC<CardProps> = ({}): JSX.Element => {
  return (
    <View>
      <Text>Card component created!</Text>
    </View>
  );
};
export default Card;

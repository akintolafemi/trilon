import React, {FunctionComponent} from 'react';
import {Image, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Colors, Fonts} from '../../common';
import {Button} from 'react-native-elements';

type Props = {
  subject: string;
  description: string;
  source: string;
  buttonTitle: string,
  press: Function
};

const SwipeContainer: FunctionComponent<Props> = ({
  source,
  subject,
  description,
  buttonTitle,
  press
}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>
        <Image
          style={{width: '100%', height: '100%', borderBottomLeftRadius: 180, borderBottomRightRadius: 180}}
          source={source}
        />

      </View>
      <View style={{flex: 1, paddingHorizontal: 50}}>
        <View style={{marginTop: 50, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20,}}>{subject}</Text>
          <Text style={{textAlign: 'center', marginTop: 5, fontSize: 15, color: Colors.dark}}>{description}</Text>
        </View>
        <Button
          title={buttonTitle}
          onPress={press}
          buttonStyle={{backgroundColor: Colors.trilon, marginTop: 50, borderRadius: 20}}
        />
      </View>
    </View>
  );
};

export default SwipeContainer;

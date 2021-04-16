import React, {FunctionComponent, PureComponent} from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../assets/icons/selection.json';
import {StyleProp, Text, TextStyle} from 'react-native';
import {Colors, Fonts} from '../common';

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const VectorIcon: FunctionComponent<{
  size: number;
  name: string;
  focused?: boolean;
  color?: string;
  label?: string;
  style?: StyleProp<TextStyle>;
}> = ({size, name, focused, color, label = '', style}) => {
  return (
    <>
      <Icon
        name={name}
        size={size}
        color={
          focused ? Colors.trilon : color ? color : Colors.darkText
        }
        {...style}
      />
      {!!label? <Text
        style={{
          color: focused ? Colors.trilon : Colors.darkText,
          fontSize: Fonts.w(12),
          borderBottomColor: focused ? Colors.trilon : Colors.darkText,
        }}>
        {label}
      </Text>: null}
    </>
  );
};

export default VectorIcon;

import React, {FunctionComponent, useEffect, useState} from 'react';
import {Icon as RNEIcon} from 'react-native-elements';
const RenderRatings = ({
  totalStars,
  colorOne,
  colorTwo,
  size = 20,
  margin = 3
}: {
  x?: number;
  colorOne?: string;
  colorTwo?: string;
  size?: number;
  margin?: number;
}) => {
  const x = totalStars;
  const j = 5 - x;
  let stars = [];
  let i;
  let k;
  for (i = 0; i < x; i++) {
    stars.push(
      <RNEIcon key={i} name="star" type='ionicon' color={colorOne} size={size} iconStyle={{marginRight: margin}} />
    );
  }
  for (k = 0; k < j; k++) {
    i++;
    stars.push(
      <RNEIcon key={i} name="star" type='ionicon' color={colorTwo} size={size} iconStyle={{marginRight: margin}} />
    );
  }
  return stars
};
export default RenderRatings;

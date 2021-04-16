import {Colors} from '../common';
export const TOKEN = 'TOKEN';
export const PAGE_COUNT = 'PAGE_COUNT';
export const DIAL_CODE = '+234';

export const TopServices = [
  {
    id: 1,
    label: 'Salon',
    source: require('../assets/icons/hair-salon.png'),
    color: Colors.trilon,
    press: null
  },{
    id: 2,
    label: 'Haircut',
    source: require('../assets/icons/hairstyle.png'),
    color: Colors.google,
    press: null
  },{
    id: 3,
    label: 'Styling',
    source: require('../assets/icons/woman-with-long-hair.png'),
    color: Colors.vk,
    press: null
  },{
    id: 4,
    label: 'Manicure',
    source: require('../assets/icons/nail-polish.png'),
    color: Colors.wechat,
    press: null
  },{
    id: 4,
    label: 'Spa',
    source: require('../assets/icons/relax.png'),
    color: Colors.pinterest,
    press: null
  },
];

export const InputIndicators = {
    AVAILABLE: "Available",
}

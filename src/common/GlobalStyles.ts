import Colors from './Colors';
import Fonts from './Fonts';

export default {
    globalScreenBg: {flex:1, backgroundColor: Colors.white, padding: Fonts.h(20)},
    paddingArround: Fonts.h(20),
    inputStyles: {
      borderWidth: Fonts.w(1),
      borderColor: Colors.colorGrey,
      height: Fonts.h(40),
      textAlign: 'center',
      marginVertical: Fonts.h(5),
    },
    buttonStyle: {
      elevation: 15,
      marginVertical: Fonts.h(5),
      height: Fonts.h(40),
      backgroundColor: Colors.primaryPurple,
    },
    buttonRoundMStyles: {
      backgroundColor: Colors.primaryPurple,
      paddingHorizontal: Fonts.w(15),
      borderRadius: Fonts.h(20),
      marginTop: Fonts.h(10)
    },
    RNEHeaderContainer: {
      backgroundColor: Colors.colorWhite,
      height: Fonts.h(120),
    },
    buttonPaddingH: Fonts.h(15),
    buttonRadius: Fonts.h(20),
};

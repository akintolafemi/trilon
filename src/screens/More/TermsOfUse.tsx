import React, {FunctionComponent} from 'react';
import {View, Text, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import {Colors, Fonts, GlobalStyles} from '../../common';
import Line from '../../components/Line';
import {RootStackParamList} from '../../navigation/routes';
import {StackScreenProps} from '@react-navigation/stack';
import ScrollableContainer from '../../components/ScrollableContainer';

type Props = StackScreenProps<RootStackParamList, 'TermsOfUse'>;
const TermsOfUse: FunctionComponent<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={[GlobalStyles.globalScreenBg, {padding: Fonts.h(0)}]}>
      <View style={{alignItems: 'center', paddingTop: 20, paddingHorizontal: 20}}>
        <Text
          style={{
            marginVertical: Fonts.w(19),
            fontSize: Fonts.w(16),
            fontFamily: Fonts.AVERTA_REGULAR,
            color: Colors.defaultText,
          }}>
          Terms of Use
        </Text>
      </View>
      <Line />
      <ScrollableContainer>
        <View style={{alignItems: 'center', paddingTop: 20}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: Fonts.w(14),
              fontFamily: Fonts.AVERTA_REGULAR,
              color: Colors.trilon,
            }}>
              1. Definitions
          </Text>
          <Text
            style={{
              textAlign: 'center',
              lineHeight: Fonts.h(30),
              fontSize: Fonts.w(14),
              fontFamily: Fonts.AVERTA_REGULAR,
              color: Colors.defaultText,
            }}>
              At savi.ng (“we”, “us”, “our” “Company”), we recognize your privacy is important. This Policy explains our privacy practices on its Website (the “Site”) and Mobile Applications. This Policy also explains what information we collect about our customers and how we use this information. This Privacy Policy is designed to be read in connection with the Site’s Terms of Use. By accessing or using our Site, you agree to be bound by the Terms of Use and this Privacy Policy.
          </Text>
          <Text
            style={{
              marginTop: Fonts.h(20),
              textAlign: 'center',
              lineHeight: Fonts.h(30),
              fontSize: Fonts.w(14),
              fontFamily: Fonts.AVERTA_REGULAR,
              color: Colors.defaultText,
            }}>
              For the purposes of clarity, “we,” “us,” “our,” the “Company” and savi.ng” refers to VFD Microfinance Bank Limited. The “Services” refers to savi.ng, a savings platform. “User,” “customer,” or “subscriber,” refers to consumers of the Service. “Personal Information,” “Personal Data,” or “Data” means any information that identifies or can be used to identify a User, directly or indirectly, including, but not limited to, name, email address, mobile number, or IP address.
          </Text>
          <Text
            style={{
              marginTop: Fonts.h(20),
              textAlign: 'center',
              fontSize: Fonts.w(14),
              fontFamily: Fonts.AVERTA_REGULAR,
              color: Colors.trilon,
            }}>
              2. Data Processing
          </Text>
          <Text
            style={{
              marginTop: Fonts.h(20),
              textAlign: 'center',
              lineHeight: Fonts.h(30),
              fontSize: Fonts.w(14),
              fontFamily: Fonts.AVERTA_REGULAR,
              color: Colors.defaultText,
            }}>
              All information supplied by Users of savi.ng as defined under the Terms of Use is covered by the provisions of Constitution of the Federal Republic of Nigeria 1999 (As amended) and other extant laws and regulations regulating the use and management of personal data.
          </Text>
        </View>
      </ScrollableContainer>
    </SafeAreaView>
  );
};

export default TermsOfUse;

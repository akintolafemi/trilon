import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import "firebase/"

import {NetworkResponse, LoginResponse, ReferralResponse} from '../interfaces/global';

const BASE_URL = 'http://192.168.43.121:3000';
const URL_SEND_TOKEN = BASE_URL + '/user/token';
const URL_VERIFY_TOKEN = BASE_URL + '/user/token/verify';

// // Firebase App (the core Firebase SDK) is always required and must be listed first
//
// import firebase from "firebase/app";
// // If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// // import * as firebase from "firebase/app"
//
// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";
//
// // Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";

//import {NetworkResponse, LoginResponse, ReferralResponse} from '../interfaces/global';
import {requestClan} from './requests';
import FirebaseConfig from '../constants/FirebaseConfig';
// const BASE_URL = 'http://192.168.43.121:3000';
// const URL_REGISTER = BASE_URL + '/user/register';
// const URL_SEND_TOKEN = BASE_URL + '/user/token';
// const URL_VERIFY_TOKEN = BASE_URL + '/user/token/verify';
// const URL_LOGIN_USERNAME = BASE_URL + '/user/login/username';
// const URL_LOGIN_PASSWORD = BASE_URL + '/user/login/password';
// const URL_VERIFY_USERNAME = BASE_URL + '/user/register/validateusername';
// const URL_REFERRAL = BASE_URL + '/user/referral';

const firebaseConfig = FirebaseConfig;

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
   firebase.firestore().settings({ experimentalForceLongPolling: true }); //add this..
}else {
   firebase.app(); // if already initialized, use that one
}

async function login(data: LoginRequest): Promise<any> {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password);
    return response;
  } catch (err) {
    console.log("There is something wrong!", err.message);
    return err.message;
  }
}

async function registerUser(data: RegisterRequest): Promise<any> {
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
    const result = await response;
    if (result.user) {
      const currentUser = firebase.auth().currentUser;

      const db = firebase.firestore();
      db.collection("trilon_users_profiles")
        .doc(currentUser.uid)
        .set({
          _id: currentUser.uid,
          email: currentUser.email,
          fullname: data.fullname,
          dob: data.dob,
          country: 'Nigeria',
          date: new Date()
        });

      currentUser.sendEmailVerification().then(function() {
        console.log("Verification mail sent");
      }).catch(function(error) {
        console.log(error);
      });
    }
    return response;
  } catch (err) {
    console.log("There is something wrong!!!!", err.message);
    return err.message;
  }
}

async function sendTokenMobile(mobile: string): Promise<any> {
  try {
    let res = {};
    let isPhone = await firebase
        .firestore()
        .collection('trilon_users_profiles')
        .where('mobile', '==', mobile)
        .get();

    let isExist = isPhone.docs.map(doc => doc.data());
    console.log(isExist);

    if (isExist.length < 1) {
      const phoneProvider = await rnAuth.signInWithPhoneNumber(mobile);
      res.confirmation = confirmation;
      res.code = "00";
    }
    else {
      res.code = "01";
      res.message = "Mobile number already used by another user";
    }
    return res;
  }
  catch (err) {
    console.log(err);
    let res = {
      code: "01",
      message: err[0]
    }
    return res;
  }
}

async function verifyTokenMobile(code: string, confirmation: Function) {
  try {
    await confirmation.confirm(code);

    await firebase.auth().currentUser.delete();

    return true;
  }
  catch (error){
    console.log(error);
    return false;
  }
}

function sendToken(data: TokenRequest): Promise<NetworkResponse> {
  return requestClan({
    data,
    type: 'POST',
    route: URL_SEND_TOKEN,
    isSecure: true,
  });
}

function verifyToken(data: TokenRequest): Promise<NetworkResponse> {
  return requestClan({
    data,
    type: 'POST',
    route: URL_VERIFY_TOKEN,
    isSecure: true,
  });
}

export default {
  login,
  registerUser,
  sendTokenMobile,
  verifyTokenMobile,
  sendToken,
  verifyToken
}

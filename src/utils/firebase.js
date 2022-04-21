import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/analytics';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB3WimbRPf3spQRnsFH79QYRN_xt_FgMtk",
    authDomain: "mrep-bookingsytem.firebaseapp.com",
    projectId: "mrep-bookingsytem",
    storageBucket: "mrep-bookingsytem.appspot.com",
    messagingSenderId: "727269445462",
    appId: "1:727269445462:web:3ed2eaa3757fcd133f10f7",
    measurementId: "G-6JKP2V0ENX"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
firebase.analytics();
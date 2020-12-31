import firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "YOUR_APIKEY",
    authDomain: "YOUR_AUTHDOMAIN",
    projectId: "YOUR_PROJECTID",
    storageBucket: "YOUR_STORAGEBUCKET",
    messagingSenderId: "YOUR_MESSAGINGSENDERID",
    appId: "YOUR_APPID"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
// firebase configuration settings
var firebaseConfig = {
  apiKey: "AIzaSyC0ItS3ABU0-LUgXZTWdasmFuiwJwOqtl8",
  authDomain: "pocket-closet-8bf0b.firebaseapp.com",
  databaseURL: "https://pocket-closet-8bf0b.firebaseio.com",
  projectId: "pocket-closet-8bf0b",
  storageBucket: "pocket-closet-8bf0b.appspot.com",
  messagingSenderId: "962491262116",
  appId: "1:962491262116:web:d272407f38031acc9f3231",
  measurementId: "G-KEV6ZH4NH4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
db.settings({timestampsInSnapshots: true});
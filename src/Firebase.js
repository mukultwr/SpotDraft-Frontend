import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDhO88fbarYIxz3iaFWWuRF35r_OkSGykA",
    authDomain: "spotdraft-b58aa.firebaseapp.com",
    projectId: "spotdraft-b58aa",
    storageBucket: "spotdraft-b58aa.appspot.com",
    messagingSenderId: "395227469746",
    appId: "1:395227469746:web:92a47e46f916fe242c76ab",
    measurementId: "G-SWTG9GKEDQ"
  };

firebase.initializeApp(config);
export default firebase;
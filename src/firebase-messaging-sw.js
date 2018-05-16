importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
//importScripts('/__/firebase/init.js');

//firebase.messaging();


var config = {
    apiKey: "AIzxxxxxxxxxxxxxxpp.com",
    databaseURL: "httpxxxxxxxxxbaseio.com",
    projectId: "payxxxxxxxja1",
    storageBucket: "payxxxxxxxxxxxxxxot.com",
    messagingSenderId: "28xxxxx76"
  };
  firebase.initializeApp(config);


const messaging = firebase.messaging();

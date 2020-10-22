import firebase from 'firebase';

var firebaseConfig = {
	apiKey: "AIzaSyBNKwNNCtXyGY5-O79u6Xq9MTQalziRpK0",
	authDomain: "yantralive-8036a.firebaseapp.com",
	databaseURL: "https://yantralive-8036a.firebaseio.com",
	projectId: "yantralive-8036a",
	storageBucket: "yantralive-8036a.appspot.com",
	messagingSenderId: "6364406316",
	appId: "1:6364406316:web:a45a1825244707bc24a789",
	measurementId: "G-QFVKW5HE17"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
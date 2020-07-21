import firebase from'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTvczkPKF5Ftp23C9sDKYrLx7U3KMlWcY",
    authDomain: "notes-5cf6a.firebaseapp.com",
    databaseURL: "https://notes-5cf6a.firebaseio.com",
    projectId: "notes-5cf6a",
    storageBucket: "notes-5cf6a.appspot.com",
    messagingSenderId: "1014809961003",
    appId: "1:1014809961003:web:8bce82a789a68337d6006e"
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const database = firebaseApp.firestore()
const auth = firebase.auth(firebaseApp)
export {database, auth}
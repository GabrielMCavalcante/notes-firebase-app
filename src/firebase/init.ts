import firebase from'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {/* YOUR FIREBASE PROJECT CONFIG*/}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const database = firebaseApp.firestore()
const auth = firebase.auth(firebaseApp)
export {database, auth}

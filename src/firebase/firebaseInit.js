import {initializeApp} from "firebase/app";
import {  getFirestore, connectFirestoreEmulator, initializeFirestore } from "firebase/firestore"
import { getAuth, connectAuthEmulator } from 'firebase/auth';


/*class FirebaseInit {
    constructor() {
        if (!FirebaseInit._instance){
            FirebaseInit._instance = this;
        }
        return FirebaseInit._instance;
        this.getApps = this.getApps();
    }

    static getInstance(){
        return this._instance;
    }

    static firebaseConfigs = {
        apiKey: "AIzaSyC_JePGjCipTI3G9CKxnyZJ_U57tyTUEus",
        authDomain: "cookerii.firebaseapp.com",
        projectId: "cookerii",
        storageBucket: "cookerii.appspot.com",
        messagingSenderId: "311655334422",
        appId: "1:311655334422:web:de7349079922c97dc0eb37"
    };

    #app = initializeApp(this.firebaseConfigs)

    static getApps (){
        return {firestore: getFirestore(this.app)};
    }

}*/

const env = "development"

const FirebaseInit = (function () {
    let instance;
    const firebaseConfigs = {
        /*apiKey: process.env._REACT_APP_API_KEY,
        authDomain: process.env._REACT_APP_AUTH_DOMAIN,
        projectId: process.env._REACT_APP_PROJECT_ID,
        storageBucket: process.env._REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env._REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env._REACT_APP_APP_ID*/
        apiKey: "AIzaSyCKhCg8-Q-7vccfEm96eiJxxb2ol5FrgdQ",
        authDomain: "realtimechatapp-fd983.firebaseapp.com",
        projectId: "realtimechatapp-fd983",
        storageBucket: "realtimechatapp-fd983.appspot.com",
        messagingSenderId: "176244274562",
        appId: "1:176244274562:web:68f9c5e3038fb92e26cb9b"
    };
    function createInstance() {
        const realtimemessageFireApp = initializeApp(firebaseConfigs);
        const  realtimemessageFireApps={};
        realtimemessageFireApps.auth = getAuth(realtimemessageFireApp);
        if (process.env.REACT_APP_ENVIRONMENT == "develop"){
            realtimemessageFireApps.database = initializeFirestore(realtimemessageFireApp,{
                useFetchStreams: false,
                experimentalForceLongPolling: true, // 👈
                merge: true,
            });
            connectFirestoreEmulator(realtimemessageFireApps.database, 'localhost', 8080);
            connectAuthEmulator(realtimemessageFireApps.auth, 'http://localhost:9099') ;
        }else{
            realtimemessageFireApps.database= getFirestore(realtimemessageFireApp);
        }
        return realtimemessageFireApps;
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


export default FirebaseInit;
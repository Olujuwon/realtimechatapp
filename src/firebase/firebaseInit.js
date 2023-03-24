import {initializeApp} from "firebase/app";
import {getFirestore, connectFirestoreEmulator, initializeFirestore} from "firebase/firestore"
import {getAuth, connectAuthEmulator} from 'firebase/auth';


const FirebaseInit = (function () {
    let instance;
    const env = process.env.REACT_APP_ENVIRONMENT;
    const firebaseConfigs = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID
    };
    function createInstance() {
        const realtimemessageFireApp = initializeApp(firebaseConfigs);
        const realtimemessageFireApps = {};
        realtimemessageFireApps.auth = getAuth(realtimemessageFireApp);
        if (env === "develop") {
            realtimemessageFireApps.database = initializeFirestore(realtimemessageFireApp, {
                useFetchStreams: false,
                experimentalForceLongPolling: true, // 👈
                merge: true,
            });
            connectFirestoreEmulator(realtimemessageFireApps.database, 'localhost', 8080);
            connectAuthEmulator(realtimemessageFireApps.auth, 'http://localhost:9099');
        } else {
            realtimemessageFireApps.database = getFirestore(realtimemessageFireApp);
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
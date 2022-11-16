import { initializeApp  } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";

import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import{
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDLoydg6RWOeRHcGzb6ZC8TYzDB1Mw5dEM",
    authDomain: "custom-clothing-db-f20ea.firebaseapp.com",
    projectId: "custom-clothing-db-f20ea",
    storageBucket: "custom-clothing-db-f20ea.appspot.com",
    messagingSenderId: "145248994857",
    appId: "1:145248994857:web:d5b7809ea47862ad09fe38",
    measurementId: "G-YLS5B216TJ"
  };
  
  // Initialize Firebase
  // eslint-disable-next-line 
  const firebaseApp = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(firebaseApp);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup( auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation

            });
        } catch(error){
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
  };

export  const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
  
 
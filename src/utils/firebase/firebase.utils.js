import { initializeApp  } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";

import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import{
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    
} from 'firebase/firestore';
// removed QuerySnapshot,
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

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase()); 
      batch.set(docRef, object);
    });
      await batch.commit();
      console.log('done');
  };

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapShot = await getDocs(q);
    return querySnapShot.docs.map((docSnapshot) => docSnapshot.data());

  };

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
    return userSnapshot;
  };

export  const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export  const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
  
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
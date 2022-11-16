import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
    auth, 
    signInWithGoogleRedirect, 
    signInWithGooglePopup, 
    createUserDocumentFromAuth  
} from '../../utils/firebase/firebase.utils.js';
// import { hasSelectionSupport } from '@testing-library/user-event/dist/utils/index.js';
import SignUpForm  from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    useEffect( () => {
        async function fetchData(){
            try{
                const response = await getRedirectResult(auth);
                const userDocRef = await createUserDocumentFromAuth(response.user);
                console.log(userDocRef);

            }catch(error){
                console.log('NO USER YET', error.message);
            }
        }
        fetchData();
    },[]);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
        createUserDocumentFromAuth(user);
    }


    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In With Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign In With Google Redirect</button>
            <SignUpForm />

        </div>    
    );
};
export default SignIn;
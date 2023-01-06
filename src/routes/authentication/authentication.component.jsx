import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';



import {
    auth, 
    // signInWithGoogleRedirect, 
    // signInWithGooglePopup, 
    createUserDocumentFromAuth  
} from '../../utils/firebase/firebase.utils.ts';
// import { hasSelectionSupport } from '@testing-library/user-event/dist/utils/index.js';
import SignUpForm  from '../../components/sign-up-form/sign-up-form.component';
import SignInForm  from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';

const Authentication = () => {
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

    


    return(
        <div className='authentication-container'>
            {/* <button onClick={logGoogleUser}>Sign In With Google Popup</button> */}
            {/* <button onClick={signInWithGoogleRedirect}>Sign In With Google Redirect</button> } */}
            <SignInForm />
            <SignUpForm />

        </div>    
    );
};
export default Authentication;
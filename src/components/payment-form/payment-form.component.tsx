import { useState, FormEvent, useEffect} from 'react';



import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';

import { useSelector } from 'react-redux';

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { PaymentFormContainer, FormContainer, PaymentButton } from  './payment-form.styles';

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);


    
    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        
        if(!stripe || !elements) {
            return;
        }
        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            // Stripe uses cents
            body: JSON.stringify({amount: amount * 100}),
            
        }).then((res) => res.json());
        
        const cardDetails = elements.getElement(CardElement);

        if(!ifValidCardElement(cardDetails)) return;
        const {paymentIntent: { client_secret} } = response;

        // if(!cardDetails){
        //     console.log("No card Details");
        //     return;
        // }
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                },
            },
        });
        cardDetails.clear();
        setIsProcessingPayment(false);
        if(paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if(paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful');
            }
        }
  
    };
    


    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={ paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay Now </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );

};


export default PaymentForm;
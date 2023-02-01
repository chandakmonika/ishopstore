import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { AppLayout } from '../../components';
import { useSelector } from 'react-redux';

const Index = () => {
  const cart = useSelector(state => state?.cart?.items);
  const [razorpayeRsponse, setRazorpayResponse] = useState({});

  const [callbackResponse, setCallbackResponse] = useState({
    type: 'init',
    message: 'Initializing payment, please wait...',
    attempt: 0,
  });
  const router = useRouter();

  useEffect(() => {
    initRazerpayPayment();
  }, []);

  useEffect(() => {
    if (cart.status === 'error_payment') {
      setCallbackResponse({
        type: 'error',
        message: 'Unable to process payment. Please try again.',
        attempt: 1,
      });
    }

    if (cart.status === 'confirmed') {
      setCallbackResponse({
        type: 'success',
        message: 'Payment completed. Redirecting, please wait...',
        attempt: 1,
      });
      router.push(`/order`);
    }
  }, [cart]);

  const loadScript = src =>
    new Promise(resolve => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const initRazerpayPayment = async () => {
    const isSDKInitialized = await loadScript(
      `https://checkout.razorpay.com/v1/checkout.js`,
    );

    if (!isSDKInitialized) {
      setCallbackResponse(prevState => ({
        type: 'error',
        message: 'Unable to load payment method. Please try again.',
        attempt: prevState.attempt + 1,
      }));

      return;
    }
    const options = {
      key: 'rzp_test_iNRcVzSqFKbQFL',
      amount: 2000 * 100,
      name: 'iShop',
      currency: 'INR',
      description: 'Purchase Description',
      handler: async response => {
        const data = {
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        setRazorpayResponse(data);

        setCallbackResponse({
          attempt: 1,
          type: 'success',
          message: 'Payment completed, placing order...',
        });
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <AppLayout>
      <div style={{ height: '560px' }}>{callbackResponse.message}</div>
      <div>{razorpayeRsponse.razorpayPaymentId}</div>
    </AppLayout>
  );
};

export default Index;

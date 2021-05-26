import React from 'react';
import { ActiveStep, IncompleteStep } from './CheckoutStep';

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className='checkout-progress step-row mt-5'>
      {shipping ? (
        <ActiveStep toAdress='shipping' text='Shipping' />
      ) : (
        <IncompleteStep text='Shipping' />
      )}

      {confirmOrder ? (
        <ActiveStep toAdress='order/confirm' text='Confirm Order' />
      ) : (
        <IncompleteStep text='Confirm Order' />
      )}

      {payment ? (
        <ActiveStep toAdress='payment' text='Payment' />
      ) : (
        <IncompleteStep text='Payment' />
      )}
    </div>
  );
};

export default CheckoutSteps;

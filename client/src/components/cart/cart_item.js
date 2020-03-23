import React from 'react';

const CartItem = ({ key, name, cost }) => {
  return (
    <div>
      { key }
      { name }
      { cost }
    </div>
  )
};

export default CartItem;
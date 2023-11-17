const inittialStateHome = {
  cartProducts: JSON.parse(localStorage.getItem('cart')),
};

export default function cartReducer(state = inittialStateHome, action) {
  switch (action.type) {
    case 'cart/addProduct':
      const { id, qty } = action.payload;
      return {
        ...state,
        cartProducts: {
          ...state.cartProducts,
          [id]: (state.cartProducts[id] || 0) + qty,
        },
      };

    case 'cart/deleteProduct':
      const newCart = { ...state.cartProducts };
      delete newCart[action.payload];
      return { ...state, cartProducts: newCart };

    default:
      return state;
  }
}

//action

export function addProduct(id, qty = 1) {
  return { type: 'cart/addProduct', payload: { id, qty } };
}

export function deleteProduct(id) {
  return { type: 'cart/deleteProduct', payload: id };
}

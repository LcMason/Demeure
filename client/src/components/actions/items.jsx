import { headers } from "../Globals"
import { setErrors } from "./errors";



export const loadItems = () => {
  // thunk middleware uses these actions to make asynchronous calls
  // it expects a function to be returned
  // the function itself takes in a parameter called dispatch

  // TODO : set errors if else statement.

  return dispatch => {
    // asynchronous calls
    fetch('/items')
    .then(resp => resp.json())
    .then(data => {
      const action = ({ type: "LOAD_ITEMS", payload: data })
      console.log(data)
      dispatch(action)
    })
  }
}

export const addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item
  };
};


export const removeFromCart = (id) => {
    return { type: "REMOVE_FROM_CART", payload: id }
}

export const adjustQty = (id, value) => {
  return { type: "ADJUST_QTY", payload: { id, qty: value} }
}

// Check syntax of deleteItem. Missing data in the dispatch?
// export const deleteItem = (id) => {
//   return dispatch => {
//     fetch(`/lists/${ id }`, {
//       method: "DELETE",
//       headers: {
//         "Accept": "application/json"
//       }
//     })
//       .then(resp => resp.json())
//       .then(data => {
//         // update reducer state;
//         // how do we update reducer state?
//         dispatch({
//           type: "DELETE_ITEM",
//           payload: id
//         });
//       })
//   }
// }

export const showItem = (id) => {
  return dispatch => {
    fetch(`/items/${id}`)
      .then(resp => resp.json())
      .then(data => {
        const action = {
          type: "SHOW_ITEM",
          payload: data
        };
        dispatch(action);
        // navigate(`/items/${id}`)
      });
  };
};

// export const removeItem = (item) => {
//   return dispatch => {
//     fetch(`/items/${item.id}`)
//       .then(resp => resp.json())
//       .then(data => {
//         const action = {
//           type: "REMOVE_ITEM",
//           payload: {
//             ...data,
//             quantity: data.quantity - 1 // Increment the quantity by 1
//           }
//         };
//         dispatch(action);
//       });
//   };
// };

// export const addItemToCart= (item, navigate) => {
//   return dispatch => {
//     fetch(`/items/${ item.id }`)
//       .then(resp => resp.json())
//       .then(data => {
//         const action = {
//           type: "ADD_ITEM_TO_CART",
//           payload: data
//         };
//         dispatch(action)
//         navigate('/cart')
//       });
//   }
// }


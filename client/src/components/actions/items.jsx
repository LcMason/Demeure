import { headers } from "../Globals"
import { setErrors } from "./errors";

export const loadLists = () => {
  // thunk middleware uses these actions to make asynchronous calls
  // it expects a function to be returned
  // the function itself takes in a parameter called dispatch

  // TODO : set errors if else statement.
  return dispatch => {
    // asynchronous calls
    fetch('/items')
    .then(resp => resp.json())
    .then(data => {
      const action = ({ type: "LOAD_LISTS", payload: data })
      console.log(data)
      dispatch(action)
    })
  }
}

// export const loadFakeItems = () => {
//     return dispatch => {
//       fetch('https://fakestoreapi.com/products')
//       .then(resp => resp.json())
//       .then(data => {
//         console.log(data, "products")
//         const action = { type: "LOAD_FAKE_ITEMS", payload: data }
//         dispatch(action)
//       })
//     }
//   }

// Check syntax of deleteItem. Missing data in the dispatch?
export const deleteItem = (id) => {
  return dispatch => {
    fetch(`/lists/${ id }`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        // update reducer state;
        // how do we update reducer state?
        dispatch({
          type: "DELETE_ITEM",
          payload: id
        });
      })
  }
}

export const editBlog = (id, formData, navigate) => {
  return dispatch => {
    fetch(`/lists/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(formData)
    })
      .then(resp => resp.json())
      .then(data => {
        // dispatch an action for editing our blog
        const action = {
          type: "EDIT_BLOG",
          payload: data
        }
        dispatch(action);
        navigate('/lists')
      })
  }
}

export const addBlog = (formData, navigate) => {
  return dispatch => {
    fetch('/lists', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.errors) {
          dispatch(setErrors(data.errors));
        } else {
          // addBlog(data)
          // dispatch to ListsReducer for adding a blog
          const action = {
            type: "ADD_BLOG",
            payload: data
          }
          
          dispatch(action);
          navigate('/lists');
        }
      });
  }
}

export const addComment = (content, blog_id, setErrors) => {
  return dispatch => {
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({ content, blog_id })
    }

    fetch("/comments", options)
      .then(resp => resp.json())
      .then(data => {
        // do stuff to make things viewable
        if(data.errors) {
          setErrors(data.errors);
        } else {
          // dispatching a comment to the listsReducer
          const action = {
            type: "ADD_BLOG_COMMENT",
            payload: data
          }
          dispatch(action)
        }
      });
  }
}
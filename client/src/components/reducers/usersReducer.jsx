const initialState = {
users: [],
currentUser: null,
loggedIn: false
}

// add all of the state values to the object above.

const usersReducer = (state=initialState, action) => {
    switch(action.type) {
        case "LOAD_USERS":
            return {
            ...state,
            users: action.payload
        }
        case "LOGIN_USER":
            return {
                ...state,
                currentUser: action.payload,
                loggedIn: true
            }
            case "ADD_USER":
                return {
                    ...state,
                    users: [...state.users, action.payload]
                }
        case "LOGOUT_USER":
            return {
                ...state,
                currentUser: null,
                loggedIn: false
            }
        default:
            return state
    }
}

export default usersReducer;
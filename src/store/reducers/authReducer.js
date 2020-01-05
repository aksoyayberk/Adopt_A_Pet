const initState = {
    isLoggedIn: false,
    loginErr: false,
    user: null
}

const authReducer = (state = initState, action) => {
    switch (action.type){
        case "LOGIN_SUCC":
            console.log("succesfully logged in as: ", action.user);
            state = {
                ...state,
                isLoggedIn: true,
                loginErr: false,
                user: action.user
            }
            break;
        case "LOGIN_ERR":
            console.log("error during log in");
            state = {
                ...state,
                isLoggedIn: false,
                loginErr: true,
                user: null
            }
            break;
        case "LOGOUT_SUCC":
            console.log("successfully logged out");
            state = {
                ...state,
                isLoggedIn: false,
                user: null
            }
            break;
        case "LOGOUT_ERR":
            console.log("error during log out");
            break;
        case "SIGNUP_SUCC":
            console.log("successfully signed up");
            state = {
                ...state,
                isLoggedIn: true,
                user: action.user
            }
            break;
        case "SIGNUP_ERR":
            console.log("error during sign up");
            break;
        default:
            break;
    }
    return state;
}

export default authReducer;
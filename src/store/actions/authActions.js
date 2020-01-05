import {firebaseRef, usersRef} from "../../config/firebaseConfig";

export const signInAction = (credentials) => {
    return(dispatch, getState) => {
        console.log("Sent: ", credentials.username, credentials.password)
        firebaseRef.auth().signInWithEmailAndPassword(credentials.username, credentials.password)
        .then((resp) => {
            console.log("current user: ", firebaseRef.auth().currentUser);
            var userID = firebaseRef.auth().currentUser.uid;
            firebaseRef.database().ref("Users/" + userID).once("value")
            .then((snapshot) => {
                const user = {...snapshot.val(), uid: userID}
                dispatch({type: "LOGIN_SUCC", user})
            })
        }).catch((err) => {
            dispatch({type: "LOGIN_ERR", err})
        })
    }
}

export const signOutAction = () => {
    return(dispatch, getState) => {
        firebaseRef.auth().signOut()
        .then(() => {
            dispatch({type: "LOGOUT_SUCC"})
        }).catch((err) => {
            dispatch({type: "LOGOUT_ERR", err})
        })
    }
}

export const signUpAction = (user) => {
    return(dispatch, getState) => {
        firebaseRef.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((resp) => {
            let tempUser = {firstName: user.firstName, lastName: user.lastName, phoneNum: user.phoneNum, location: user.location, email: user.email};
            firebaseRef.database().ref("Users/" + resp.user.uid).set(tempUser)
            .then(() => {
                dispatch({type: "SIGNUP_SUCC", user: {...tempUser, uid:  resp.user.uid}})
            }).catch((err) => {
                dispatch({type: "SIGNUP_ERR", err})
            })   
        }).catch((err) => {
            dispatch({type: "SIGNUP_ERR", err})
        })
    }
}
import {firebaseRef, petsRef, usersRef} from "../../config/firebaseConfig";

export const addPetAction = (pet) => {
    return (dispatch, getState) => {  
        const newPet = {...pet, uid: firebaseRef.auth().currentUser.uid}
        petsRef.push().set(newPet)
            .then(() => dispatch({type: "ADD_PET_SUCC", newPet}))
            .catch((err) => dispatch({type: "ADD_PET_ERR", err}))
    }
}

export const setRegSucc = (flag) => {
    return (dispatch, getState) => {
        if(flag)
            dispatch({type: "SET_REG_SUCC_TRUE"})
        else if (!flag)
            dispatch({type: "SET_REG_SUCC_FALSE"})
    }
}

export const fetchPetsAction = () => {
    return (dispatch, getState) => {
        petsRef.on("value", snapshot => {
            console.log("New update: ", snapshot.val());
            //UPDATE REDUX STATE USING THIS DATA
        })
    }
}

export const updateStateAction = () => {
    return (dispatch, getState) => {
        petsRef.on("value", snapshot => {
            let arr = [];
            snapshot.forEach((pet) => {
                arr = [...arr, pet]
            })
            dispatch({type: "UPDATE_PETS_STATE", arr});
        });
        usersRef.on("value", snapshot => {
            let users = [];
            snapshot.forEach((user) => {
                users = [...users, user]
            })
            dispatch({type: "UPDATE_USERS_STATE", users})
        })
    }
}
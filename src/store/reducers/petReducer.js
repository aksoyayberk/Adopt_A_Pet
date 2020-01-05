import {petsRef} from "../../config/firebaseConfig";
import React, {useEffect} from "react";
import { act } from "react-dom/test-utils";

const initState = {
    pets: [],
    users: [],
    isRegisterSucc: false
}

const petReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_PET_SUCC":
            state = {
                ...state,
                isRegisterSucc: true
            }
            console.log("Pet registered");
            break;
        case "ADD_PET_ERR":
            state = {
                ...state,
                isRegisterSucc: false
            }
            console.log("add pet error: ", action.err);
            break;
        case "UPDATE_PETS_STATE":
            state = {
                ...state,
                pets: [...action.arr],
            }
            break;
        case "UPDATE_USERS_STATE":
            state = {
                ...state,
                users: [...action.users]
            }
            break;
        case "SET_REG_SUCC_TRUE":
            state = {
                ...state,
                isRegisterSucc: true
            }
            break;
        case "SET_REG_SUCC_FALSE":
            state = {
                ...state,
                isRegisterSucc: false
            }
            break;
        default:
            break;
    }
    return state;
}

export default petReducer;
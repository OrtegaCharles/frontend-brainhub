import {ActionTypes} from './types'

export const setUsers = (users) => {
    return {
        type: ActionTypes.SET_USERS,
        payload: users,
    };
}

export const deleteUsers = (user) => {
    return {
        type: ActionTypes.DELETE_USER,
        payload: user,
    };
}
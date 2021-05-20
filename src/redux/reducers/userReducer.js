import {ActionTypes} from '../actions/types';

const initialState = {
    users: []
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_USERS:
            return{
                ...state,
                users: action.payload
            }
        case ActionTypes.DELETE_USER:
            const indx = state.users.indexOf(action.payload);
            let newUsers = [...state.users];
            newUsers.splice(indx, 1);
            return{
                ...state,
                users: newUsers
            }
        default:
            return state;
    }
}
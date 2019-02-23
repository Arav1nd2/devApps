import {createReducer} from 'redux-starter-kit';

export const reducer = (state = {}, action = {}) => {

    switch(action.type) {
        case 'Signup' : 
            return {...state , "user" : action.user }
        case 'login' : 
            return {...state ,  "user" : action.user}
        case 'loginErr' :
            return {...state, "error" : action.ErrorMessage}
        case 'logout' : 
            return {...state, "user" : null}
        case 'placeOrder' :
            return {...state, "uploadState" : true , "user" : action.newUser , "orders": action.newOrder}
        case 'setUsers' :
            return {...state, "user":action.user }
        case 'getOrders' : 
            return {...state, "orders": action.orders}
        case 'getTasks' : 
            return {...state, "tasks": action.tasks}
        case 'getNotifs' : 
            return {...state,"notifs" : action.notifs}
        case 'sendMail' : 
            return {...state}
        default : return state;
    }
}

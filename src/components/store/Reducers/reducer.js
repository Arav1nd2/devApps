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
    //     case 'addJobs' : 
    //         return {...state}
    //     case 'getJobs' : 
    //         return {...state, "jobs" : action.jobs}
    //     case 'updateProfile':
    //         return {...state, "user": action.userDetails }
        case 'setUsers' :
            return {...state, "user":action.user }
        default : return state;
    }
}
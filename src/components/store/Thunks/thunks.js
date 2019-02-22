import {app, db} from '../../../firebase';
import {store, history} from '../store';

export const signup = (email,pass) => (dispatch) => {
    app.auth().createUserWithEmailAndPassword(email,pass).then(() => {
        console.log("Success");
        dispatch({
            "type" : "Signup",
            "user" : app.auth().currentUser
        });
    }).catch((err) => {
        console.log(err);
    })
}

export const login = (email,pass) => (dispatch) => {
    app.auth().signInWithEmailAndPassword(email,pass).then(() => {
        let user = app.auth().currentUser;
        if(user.emailVerified) {
            db.collection('users').doc(user.uid).get().then((doc) => {
                if(doc.exists) {
                    dispatch({
                        "type" : "login",
                        "user" : doc.data()
                    });
                }
            })
            
        } else {
            app.auth().signOut().then(() => {
                
                dispatch({
                    "type" : "loginErr",
                    "ErrorMessage" : "Email not verified"
                });
            })
        }
    }).catch(err => console.log(err));
}
export const logout = () => (dispatch) => { 
    app.auth().signOut().then(() => {
        history.push('/login');
        dispatch({
            "type" : "logout"
        });
    });
}
export const setUser = (userId) => (dispatch) => {
    db.collection('users').doc(userId).get().then((doc) => {
        if(doc.exists) {
            dispatch({
                "type" : "setUsers",
                "user" : doc.data()
            });
        }
    })
}
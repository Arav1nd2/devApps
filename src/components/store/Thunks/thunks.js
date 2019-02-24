import {app, db} from '../../../firebase';
import {store, history} from '../store';
import axios from 'axios';
import  {notify} from 'react-notify-toast';

export const signup = (email,pass) => (dispatch) => {
    app.auth().createUserWithEmailAndPassword(email,pass).then(() => {
        notify.show("Account created !","success");
        dispatch({
            "type" : "Signup",
            "user" : app.auth().currentUser
        });
    }).catch((err) => {
        notify.show(err.message,"error");
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

export const postOrder = (details) => (dispatch) => {
    let data = store.getState().reducer.user;
    let date = new Date();
    let order = store.getState().reducer.orders ? store.getState().reducer.orders : [];
    let newDetails = {...details,userid : data.id,contactEmail : data.email,time:date }
    db.collection('orders').add(newDetails).then((docRef) => {
        newDetails = {...newDetails,orderId: docRef.id}
        db.collection('orders').doc(docRef.id).update(newDetails).then(() => {
            let users,newOrder;
            newOrder = [...order,newDetails];
            users = {...data,"orders" : [...data.orders,docRef.id] }        
            db.collection('users').doc(data.id).set(users).then((doc) => {
                notify.show("Order placed","success");
                dispatch({
                    "type" : "placeOrder",
                    "newUser" : users ,
                    "newOrder" : newOrder
                });          
            });
        });
    })
}

export const getOrder = (ids) => (dispatch) => {
    let jobs = [];
    let idsProcessed = 0;
    ids.forEach(element => {
        db.collection('orders').doc(element).get().then((snap) => {
            if(snap.exists) {
                jobs.push(snap.data());
            }
        }).then(() => {
            idsProcessed++;
            if(idsProcessed === ids.length)
            {
                dispatch({
                    "type" : "getOrders",
                    "orders" : jobs
                 });
            }
        }).catch((err) => {
            notify.show(err.message,"error");
        })
        
    });
}
export const getTasks = () => (dispatch) => {
    let tasks;
    db.collection('tasks').get().then(snap => {
        tasks = snap.docs.map((task) => task.data());
    }).then(() => {
        dispatch({
            "type" : "getTasks",
            tasks
        });
    }).catch((err) => {
        notify.show(err.message,"error");
    })
}

    // export const getTasks = () => (dispatch) => {
    //     let tasks = [];
    //     console.log("Inside getTasks");
    //     db.collection('tasks').onSnapshot(snap => {
    //         let changes = snap.docChanges();
    //         let newChange = changes.filter((val) => {return (val.type !== "removed")});
    //         console.log(newChange);
    //         dispatch({
    //             "type" : "getTasks",
    //             tasks
    //         });
    //     })
    // }

// export const getNotifs = () => (dispatch) => {
//     let notifs;
//     db.collection('orders').orderBy("time","asc").get().then(snap => {
//         notifs = snap.docs.map((notif) => notif.data());
//     }).then(() => {
//         dispatch({
//             "type" : "getNotifs",
//             notifs
//         });
//     })
// }
    export const getNotifs = () => (dispatch) => {
        let notifs = store.getState().reducer.notifs ? store.getState().reducer.notifs.splice() : []; 
        db.collection('orders').orderBy('time','asc').onSnapshot((snap) => {
            let changes = snap.docChanges();
            console.log(changes);
            changes.forEach(change => {
                if(change.type === "added") {
                    notifs.push(change.doc.data());
                }
                if(change.type === 'removed') {
                    notifs = notifs.filter((val) => {return (val.orderId !== change.doc.id)})
                }
            })
            console.log(notifs);
            dispatch({
                "type" : "getNotifs",
                notifs
            });
        })
    }

export const sendMail = (data) => (dispatch) => {
    axios.post('https://us-central1-devapps-5c8a1.cloudfunctions.net/sendEmail/sendemail', data).then((res) => {
        notify.show("Email Sent",'success');
        dispatch({
            "type" : "sendMail"
        });
    }).catch((err) => {
        notify.show(err.message,"error");
    });
}
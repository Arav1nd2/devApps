import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import { reducer } from './Reducers/reducer';
import thunkMiddleware from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const initialState = {};


export const history = createHistory();
const middleware = routerMiddleware(history);

export const store =   createStore(combineReducers({reducer,router: routerReducer} ),initialState,compose(
    applyMiddleware(middleware,thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));


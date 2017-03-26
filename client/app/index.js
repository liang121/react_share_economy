// import React from "react";
// import {render} from "react-dom";
// import {Router, Route, browserHistory, IndexRoute} from "react-router";

// import {Root} from "./components/Root";
// import {Home} from "./components/Home";
// import {User} from "./components/User";
// import App from './containers/App';
// import Layout from './containers/Layout';
// import Departments from './components/Departments';

// class App1 extends React.Component {
//     render() {
//         return (
//             <Router history={browserHistory}>
//                 <Route path={"/"} component={App} >
//                     <IndexRoute component={Layout} />
//                     <Route path={"home"} component={Departments}>
//                         <Route path={"user/:id"} component={User} />
//                     </Route>
//                 </Route>
//             </Router>
//         );
//     }
// }

// render(<App1 />, window.document.getElementById('app'));

import 'babel-polyfill';
import 'fastclick';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import '../../styles/main.scss';
import  App  from './containers/App';
import configureStore from './store/configureStore';
import routes from './routes';

const app = document.getElementById('app');
const store = configureStore();
ReactDOM.render(
 <Provider store={store}>
     <Router history={browserHistory} routes={routes} />
 </Provider>, app
)
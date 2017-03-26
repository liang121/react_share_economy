import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
// router
// import {Root} from "./components/Root";
// import {Home} from "./components/Home";
// import {User} from "./components/User";
import App from './containers/App';
import Layout from './containers/Layout';
import Login from './containers/Login';
import CreateAccount from './containers/CreateAccount';
import Departments from './components/Departments';
import ItemLists from './containers/ItemLists';
import ItemDetail from './containers/ItemDetail';

export default (
    <Route path={"/"} component={App} >
        {/*<IndexRoute component={Layout} />
        <Route path={"home"} component={Departments}>
            <Route path={"user/:id"} component={User} />
        </Route>*/}
        <Route path={"login"} component={Login}></Route>
        <Route path={"createAccount"} component={CreateAccount}></Route>
        <Route path={"xchange"} component={Layout}>
        	<IndexRoute component={Departments}/>
            <Route path={"items/:type"} component={ItemLists}></Route>
            <Route path={"itemDetail/:itemId"} component={ItemDetail}></Route>
        </Route>
    </Route>
)
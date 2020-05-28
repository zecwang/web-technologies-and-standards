import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Home from "./containers/home/home";
import AddressOne from "./containers/router-examples/address-one";
import AddressTwo from "./containers/router-examples/address-two";

ReactDOM.render((
	<BrowserRouter>
		<Switch>
			<Route exact path='/'><Home/></Route>
			<Route path="/addressOne"><AddressOne/></Route>
			<Route path="/addressTwo"><AddressTwo/></Route>
			<Route path="/addressThree"><Redirect to="/addressOne"/></Route>
		</Switch>
	</BrowserRouter>
), document.getElementById('root'));
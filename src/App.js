import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import MachinesContainer from './containers/MachinesContainer';
import MachineContainer from './containers/MachineContainer';
import './App.css';

/* eslint-disable react/prop-types */
export default function App () {
	console.log('App -- Render');
	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					<img alt='logo' height='272' width='800' src='https://i.imgur.com/jcvsFKh.png' />
				</header>

				<nav className='App-nav'>
					<Link to='/'>Home</Link>
					<Link to='/machines'>Machines</Link>
				</nav>


				<Switch>
					<Route path='/machines/:id' component={MachineContainer}/>
					<Route path='/machines'>
						<MachinesContainer />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}


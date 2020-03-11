import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import axios from 'axios';
import { fetchMachineList } from './store/machine';
import store from './store'
import Machines from './Machines';
import Machine from './Machine';
import './App.css';

class App extends React.Component {
	async UNSAFE_componentWillMount() {
		console.log('App -- WillMount Start');
		const { data: result }  = await axios.get('http://localhost:8080/machines');
		console.log('App -- WillMount Data Fetched' );
		store.dispatch(fetchMachineList(result));
		console.log('App -- WillMount End' );
	}
	render() {
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
						<Route path='/machines/:id' component={Machine}>
						</Route>
						<Route path='/machines'>
							<Machines />
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;

import { createContext, useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

import Nav from './Components/Navbar/Nav';
import Home from './Pages/home/Home';
import SignInUp from './Pages/SignIn_Up';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './Components/PrivateRoutes/PrivateRoute';
import './App.css';


import Container from '@mui/material/Container';
import List from './Pages/List';
import Finalize from './Pages/Finalize';
import Booking from './Pages/bookings/Booking';
import Failed from './Pages/SignManager/Failed';
import Details from './Pages/details/Details';


export const UserContext = createContext();

function App() {


	const [loggedInUser, setLoggedInUser] = useState({});


	return (
		<UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
			<Router>
				<div>
					<Nav />
					<Container>

						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route exact path="/signup">
								<SignInUp />
							</Route>
							<Route exact path="/failed">
								<Failed />
							</Route>
							<Route exact path="/details/:id">
								<Details />
							</Route>
							<PrivateRoute exact path="/dashboard">
								<Dashboard />
							</PrivateRoute>
							<PrivateRoute exact path="/profile">
								<List />
							</PrivateRoute>
							<PrivateRoute exact path="/confirm">
								<Finalize />
							</PrivateRoute>
							<PrivateRoute exact path='/bookings'>
								<Booking />
							</PrivateRoute>

						</Switch>
					</Container>
				</div>
			</Router>

		</UserContext.Provider>
	);
}

export default App;

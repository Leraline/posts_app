// eslint-disable-next-line quotes
import React from 'react';
import './styles/App.css'
import { RouterProvider } from "react-router-dom";
import { router } from './routes';
import Navbar from './components/UI/Navbar/Navbar';


function App() {

	return (
		<div>
			<Navbar/>
			<RouterProvider router={router}/>
		</div>
	)
}


export default App;

import './App.css';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from './components/ui/spinner/Spinner';

function App() {

	return (
		<div className="App">
			<ToastContainer />
			<Spinner />
			<BrowserRouter>
				<Router />
			</BrowserRouter>

		</div>
	);
}

export default App;
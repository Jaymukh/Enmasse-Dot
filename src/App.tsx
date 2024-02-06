// External libraries
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';

// CSS
import './styles/main.css';

// Components
import { Spinner } from './components/ui/spinner/Spinner';
// import { SpinnerLite } from './components/ui/spinner/SpinnerLite';
import Toast from './components/ui/toast/Toast';
import { useEffect } from 'react';
import ReactGA from 'react-ga';


function App() {

	useEffect(() => {
		ReactGA.initialize('UA-300704168-1');
	}, []);

	return (
		<div className="App">
			<Spinner />
			<Toast />
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</div>
	);
}

export default App;

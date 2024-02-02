// External libraries
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react';

// CSS
import './styles/main.css';

// Components
import { Spinner } from './components/ui/spinner/Spinner';
// import { SpinnerLite } from './components/ui/spinner/SpinnerLite';
import Toast from './components/ui/toast/Toast';


function App() {

	const rollbarConfig = {
		accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
		environment: 'testenv',
		captureUncaught: true,
		captureUnhandledRejections: true,
	};

	return (
		<div className="App">
			<Spinner />
			<Toast />
			<BrowserRouter>
				<Provider config={rollbarConfig}>
					<ErrorBoundary>
						<Router />
					</ErrorBoundary>
				</Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;

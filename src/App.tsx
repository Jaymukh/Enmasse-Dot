import './styles/main.css';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from './components/ui/spinner/Spinner';
import Toast from './components/ui/toast/Toast';

function App() {

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

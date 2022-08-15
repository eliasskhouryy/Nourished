import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import { AuthContextProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<div>
			
			<h1>Nourished</h1>
		{/* <AuthContextProvider> */}
		<App />
		{/* </AuthContextProvider> */}
		</div>
	</React.StrictMode>
);

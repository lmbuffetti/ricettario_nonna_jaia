// eslint-disable-next-line
import 'regenerator-runtime/runtime';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Spinner from './components/Spinner';

const App = React.lazy(() => import('./App'));

const container = document.getElementById('root');
ReactDOM.render(
    <Suspense fallback={<Spinner isLoading />}><App /></Suspense>, container,
);

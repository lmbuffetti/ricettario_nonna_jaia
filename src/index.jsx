// eslint-disable-next-line
import 'regenerator-runtime/runtime';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Spinner from './components/Spinner';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

const App = React.lazy(() => import('./App'));

const container = document.getElementById('root');
ReactDOM.render(
    <Suspense fallback={<Spinner isLoading />}><App /></Suspense>, container,
);

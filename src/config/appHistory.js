
// Use browser history with server side settings (history-api-fallback)
// Ex. For node express see 'express-history-api-fallback'
// For webpack dev server run with '--history-api-fallback' flag
// import { BrowserRouter } from 'react-router-dom';

import { createBrowserHistory } from 'history';

// const appHistory = BrowserRouter;
const appHistory = createBrowserHistory();

// Use hash history if you cannot configure server side
// import { useRouterHistory } from 'react-router';
// import { createHashHistory } from 'history';
//
// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

export default appHistory;

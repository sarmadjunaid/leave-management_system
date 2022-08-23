import {createRoot} from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import Main from 'App';
import {store} from 'app/store';
import {Auth0Provider} from '@auth0/auth0-react';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain="dev-tp4pdcl2.us.auth0.com"
          clientId="gDOjRH7m2cKfgsSuQjEEt0fXyFngGI8h"
          redirectUri={window.location.origin}
          audience="https://server.example.com"
        >
          <Main />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>,
);

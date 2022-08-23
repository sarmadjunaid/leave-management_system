import React, {useEffect, useState} from 'react';
import {withAuthenticationRequired} from '@auth0/auth0-react';


import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';

const PrivateRoute = () => {
  const {getAccessTokenSilently} = useAuth0();

  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get('http://localhost:8000/auth/private/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
      } catch (e) {
        console.log('error working');
        console.error(e);
      }
    })();
  }, [flag]);


  const makeRequest = async () => {
    setFlag(!flag);
  };

  return (
    <>
      <button onClick={makeRequest}>Check Backend Call</button>
    </>

  );
};

export default withAuthenticationRequired(PrivateRoute, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});

import axios from 'axios';

axios.defaults.withCredentials = true;

export const getServerSideToken = req => {
  const { signedCookies = {} } = req;

  if(!signedCookies){
    return {};
  } else if (!signedCookies.token) {
    return {};
  }
  return { user: signedCookies.token }
}

export const getClientSideToken = () =>{
  if(typeof window !== 'underfined') {
    const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {};
    return { user };
  }
  return {user: {} };
}

const WINDOW_USER_SCRIPT_VARIABLE = '__USER__';

export const getUserScript = user =>{
  return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`;
}

export const authInitialProps = () => ({ req, res }) =>{
  const auth = req ? getServerSideToken(req) : getClientSideToken();
  return { auth };
}

export const loginUser = async (email, password) =>{
  const { data } = await axios.post('/api/login', { email, password });
  if(typeof window !=='underfined'){
    window[WINDOW_USER_SCRIPT_VARIABLE] = data || {};
  }
}

export const getUserProfile = async () =>{
  const { data } = await axios.get('api/profile');
  return data;
}
export const BASE_URL = 'https://api.spichka.nomoredomains.icu';

export const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
}
  return Promise.reject(res.status);
};

export const headers =  {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const register = ({email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    credentials: "include",
    body: JSON.stringify({email, password})
  })
  .then(res => handleResponse(res));
}

export const authorize = ({email, password}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    credentials: "include",
    body: JSON.stringify({email, password})
  })
  .then(res => handleResponse(res));
}

export const getEmail = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers, 
      credentials: "include"
    })
    .then(res => handleResponse(res));
  }

  export const logOut = () => {
    return fetch(`${BASE_URL}/signout`, {
      method: 'POST',
      headers,
      credentials: "include",
    })
    .then(res => handleResponse(res));
  }

const URL = 'https://hcateringback-dev.unitbeandev.com/api/';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

export const login = () => {
  return fetch(`${URL}auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      login: 'admin',
      password: 'admin'
    })
  })
    .then((res) => {
      return checkResponse(res);
    })
}

export const getItems = (currentPage, pageSize, token) => {
  return fetch(`${URL}wh/items?page=${currentPage}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  })
    .then(res => {
      return checkResponse(res);
    })
}
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

export const getItems = (currentPage, pageSize, token, query, sortBy, order) => {
  return fetch(`${URL}wh/items?page=${currentPage}&pageSize=${pageSize}&itemName=${query}&sortBy=${sortBy}&sortOrder=${order}`, {
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

export const createItem = (item, token) => {
  return fetch(`${URL}wh/items`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify({
      name: `${item.name}`,
      description: `${item.description || ''}`,
      measurement_units: `${item.measurement_units}`,
      code: `${item.code || ''}`
    })
  })
    .then(res => {
      return checkResponse(res);
    })
}

export const changeItem = (item, token) => {
  return fetch(`${URL}wh/items/${item.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify({
      name: `${item.name}`,
      description: `${item.description || ''}`,
      measurement_units: `${item.measurement_units}`,
      code: `${item.code || ''}`
    })
  })
    .then(res => {
      return checkResponse(res);
    })
}
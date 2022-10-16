import React from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

const config = {
  api: process.env.REACT_APP_API_URL,
  options: {
    headers: { 'content-type': 'application/json' },
  },
};

const handleResponse = (response) => {
  if (response.status === 200) {
    return response.data;
  }
  throw Error(response.data ? response.data : 'error');
};

const httpGet = (cityName) => {
  return axios(`${config.api}?q=${cityName}&units=${'metric'}&appid=${apiKey}`, {
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      throw Error(error);
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { httpGet };

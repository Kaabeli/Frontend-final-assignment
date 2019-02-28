import React, { Component } from 'react'
import axios from 'axios';

const GetCustomers = () => {
  axios.get('https://customerrest.herokuapp.com/api')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
export default GetCustomers;
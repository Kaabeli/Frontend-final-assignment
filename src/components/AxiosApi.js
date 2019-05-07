import axios from 'axios';

const url = 'https://customerrest.herokuapp.com/';

export const getCustomers = () => {
    return axios.get(`${url}api/customers`)
}

export const getTraining = () => {
    return axios.get(`${url}api/trainings`)
}
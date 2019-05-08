import axios from 'axios';

const url = 'https://customerrest.herokuapp.com/';


//CUSTOMER CALLS
export const getCustomers = () => {
    return axios.get(`${url}api/customers`)
}

export const deleteCustomer = (data) => {
    return axios.delete(data);
}

export const addCustomer = (data) => {
    return axios.post(`${url}api/customers`, data);
}


//TRAINING CALLS
export const getTraining = () => {
    return axios.get(`${url}api/trainings`);
}

export const deleteTraining = (id) => {
    return axios.delete(`${url}api/trainings/${id}`);
}

export const addTraining = (data) => {
    return axios.post(`${url}api/trainings`, data);
}
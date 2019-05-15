import axios from 'axios';

const url = 'https://customerrest.herokuapp.com/';


//CUSTOMER CALLS
export const getCustomers = () => {
    return axios.get(`${url}api/customers`)
}

export const deleteCustomer = (id) => {
    return axios.delete(id);
}

export const addCustomer = (newCustomer) => {
    return axios.post(`${url}api/customers`, newCustomer);
}

export const updateCustomer = (id, newCustomer) => {
    return axios.put(id, newCustomer);
}

//TRAINING CALLS
export const getTraining = () => {
    return axios.get(`${url}gettrainings`);
}

export const deleteTraining = (id) => {
    return axios.delete(`${url}api/trainings/${id}`);
}

export const addTraining = (newTraining) => {
    return axios.post(`${url}api/trainings`, newTraining);
}
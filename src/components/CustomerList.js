import React, { Component } from 'react'
import { getCustomers } from './AxiosApi';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

export default class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
        }
    }

    componentDidMount() {
        this.getCustomers();
    }

    getCustomers = () => {
        getCustomers()
            .then((response) => {
                let data = response.data.content;
                data.forEach(trainings => trainings.date = moment(trainings.data).format("DD/MM/YYYY"))
                this.setState({
                    customers: data,
                })
            })
            .catch(function (error) {
                console.log("Sattuupi virhe noissa asiakkaissa sitten:", error);

            })
    }


    render() {
        const columns = [{
            Header: 'Customers',
            columns: [
                {
                    Header: 'First name',
                    accessor: 'firstname'
                },
                {
                    Header: 'Last name',
                    accessor: 'lastname'
                },
                {
                    Header: 'Email',
                    accessor: 'email'
                },
                {
                    Header: 'Phone number',
                    accessor: 'phone'
                },
                {
                    Header: 'Street address',
                    accessor: 'streetaddress'
                },
                {
                    Header: 'Postcode',
                    accessor: 'postcode'
                },
                {
                    Header: 'City',
                    accessor: 'city'
                }
            ]
        }]

        return (
            <div id="customers">
                <ReactTable
                    data={this.state.customers}
                    defaultPageSize={15}
                    filterable={true}
                    columns={columns}
                    className="-striped -highlight"
                />
            </div>
        )
    }
}

import React, { Component } from 'react'
import { getCustomers, deleteCustomer } from './AxiosApi';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

export default class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            open: false,
            message: '',
        }
    }

    componentDidMount() {
        this.getCustomers();
    }

    getCustomers = () => {
        getCustomers()
            .then((response) => {
                let data = response.data.content;
                this.setState({
                    customers: data,
                })
            })
            .catch(function (error) {
                console.log("Sattuupi virhe noissa asiakkaissa sitten:", error);

            })
    }

    deleteCustomer = (customer) => {
        if(window.confirm("Are you sure you want to delete customer?")) {
            deleteCustomer(customer)
            .then(res => this.getCustomers())
            .then(res => this.setState({
                open: true,
                message: "Customer removed"
            }))
            .catch(err => console.log("Tapahtuipi poistossa erhe:", err))
        }
    }

    handleClose = (event, reason) => {
        this.setState({
            open: false,
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
                },
                {
                    Header: '',
                    filterable: false,
                    sortable: false,
                    width: 90,
                    accessor: 'links.0.href',
                    Cell: ({ value }) => (
                        <button type="button" className="btn btn-danger" onClick={() => this.deleteCustomer(value)}>Delete</button>
                    )
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

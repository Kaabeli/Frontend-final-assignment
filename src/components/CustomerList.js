import React, { Component } from 'react'
import { getCustomers, deleteCustomer, addCustomer } from './AxiosApi';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button } from 'react-bootstrap';

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

    deleteCustomer = customer => {
        if(window.confirm("Are you sure you want to delete customer?")) {
            console.log("Logging this: ", customer)
            deleteCustomer(customer)
            .then(res => this.getCustomers())
            .then(res => this.setState({
                open: true,
                message: "Customer removed"
            }))
            .catch(err => console.log("Tapahtuipi poistossa erhe:", err))
        }
    }

    addCustomer = newCustomer => {
        addCustomer(newCustomer)
        .then(res => this.getCustomers())
        .then(res => this.setState({
            open: true,
            message: 'New customer added'
        }))
        .catch(err => console.log("Voihan pylly! Tapahtuipi virhe lisäyksessä: ", err))
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
                    accessor: 'original.link[0].href',
                    Cell: ({ original  }) => {
                        console.log("lol3: ", original)
                        return (
                        <Button variant="outline-danger" onClick={() => this.deleteCustomer(original.links[0].href)}>Delete</Button>
                    )
                }
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

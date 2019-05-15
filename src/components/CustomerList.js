import React, { Component } from 'react'
import { getCustomers, deleteCustomer, addCustomer } from './AxiosApi';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Button, Collapse, Row, Col } from 'react-bootstrap';
import NewCustomer from './NewCustomer';
import EditCustomer from './EditCustomer';

export default class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            openCustomerButton: false,
            openCustomerEdit: false,
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

    addCustomer = newCustomer => {
        addCustomer(newCustomer)
            .then(res => this.getCustomers())
            .catch(err => console.log("Voihan pylly! Tapahtuipi virhe lisäyksessä: ", err))
    }

    deleteCustomer = customer => {
        if (window.confirm("Are you sure you want to delete customer?")) {
            console.log("Logging this: ", customer)
            deleteCustomer(customer)
                .then(res => this.getCustomers())
                .catch(err => console.log("Tapahtuipi poistossa erhe:", err))
        }
    }

    render() {
        const { openCustomerButton } = this.state;
        const { openCustomerEdit } = this.state;
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
                    Cell: ({ original }) => {
                        return (
                            <Button variant="outline-danger" onClick={() => this.deleteCustomer(original.links[0].href)}>Delete</Button>
                        )
                    }
                }

            ]
        }]

        return (
            <div>
                <div className="button-place">
                    <br />
                    <Row>
                        <Col>
                            <Button
                                variant="outline-secondary"
                                onClick={() => this.setState({
                                    openCustomerButton: !openCustomerButton,
                                })}
                                aria-controls="addCustomer"
                                aria-expanded={openCustomerButton}
                            >{this.state.openCustomerButton ? 'Hide' : 'Add Customer'}
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="outline-secondary"
                                onClick={() => this.setState({
                                    openCustomerEdit: !openCustomerEdit,
                                })}
                                aria-controls="addCustomer"
                                aria-expanded={openCustomerEdit}
                            >{this.state.openCustomerEdit ? 'Hide' : 'Edit Customer'}
                            </Button>
                        
                        </Col>
                    </Row>

                    <Collapse in={this.state.openCustomerButton}>
                        <div id="addCustomer">
                            <NewCustomer
                            addCustomer={this.addCustomer} />
                        </div>
                    </Collapse>

                    <Collapse in={this.state.openCustomerEdit}>
                        <div id="addCustomer">
                            <EditCustomer
                            getCustomers={this.getCustomers}
                            customerList={this.state.customers}
                            />
                        </div>
                    </Collapse>

                    <hr />
                </div>
                <div id="customers">
                    <ReactTable
                        data={this.state.customers}
                        defaultPageSize={15}
                        filterable={true}
                        columns={columns}
                        className="-striped -highlight"
                    />
                </div>
            </div>
        )
    }
}

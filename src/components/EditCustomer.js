import React, { Component } from 'react'
import { updateCustomer } from './AxiosApi';
import { Button, Form, Col } from 'react-bootstrap';

export default class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomer: '',
            firstName: '',
            lastName: '',
            streetAddress: '',
            postCode: '',
            city: '',
            email: '',
            phoneNumber: '',
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    editCustomerData = (e) => {
        const editCustomer = {
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            streetaddress: this.state.streetAddress,
            postcode: this.state.postCode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phoneNumber,
        }
        updateCustomer(this.state.selectedCustomer, editCustomer)
        .then(this.props.getCustomers)
        console.log("Edit Customer: ", editCustomer);
    }

  render() {
     const customers = this.props.customerList.map((customer, index) =>
          <option key={index} value={customer.links[0].href}>{customer.firstname} {customer.lastname}</option>
      )
    return  (
        
        <div>

            <hr />
            <h5>Edit Customer</h5>
            <Form>
                <Form.Group>
                    <Form.Label>Select Customer</Form.Label>
                    <Form.Control as="select" onChange={(e) => this.setState({ selectedCustomer: e.target.value })}>
                        <option>-- Select Customer --</option>
                        {customers}
                    </Form.Control>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" name="firstName" placeholder="Enter first name" value={this.state.firstName} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" name="lastName" placeholder="Enter last name" value={this.state.lastName} onChange={this.handleChange} />
                    </Form.Group>
                </Form.Row>


                <Form.Group controlId="formInlineStreetAddress">
                    <Form.Label>Street address</Form.Label>
                    <Form.Control type="text" name="streetAddress" placeholder="1234 Main Street" value={this.state.streetAddress} onChange={this.handleChange} />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPostcode">
                        <Form.Label>Postcode</Form.Label>
                        <Form.Control type="text" name="postCode" placeholder="00000" value={this.state.postCode} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" placeholder="Helsinki, Stockholm, Copenhagen..." value={this.state.city} onChange={this.handleChange} />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="text" name="phoneNumber" placeholder="Enter phone number" value={this.state.phoneNumber} onChange={this.handleChange} />
                    </Form.Group>
                </Form.Row>

                <div id="formButtons">
                    <Button variant="success" id="save-button" onClick={() => this.editCustomerData()}>Save</Button>
                </div>
            </Form>
        </div>
    )
  }
}

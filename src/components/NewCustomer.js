import React, { Component } from 'react'
import { Button, Form, Col } from 'react-bootstrap';


export default class NewCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  saveCustomer = (e) => {
    const newCustomer = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      streetaddress: this.state.streetAddress,
      postcode: this.state.postCode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phoneNumber,
    }
    this.props.addCustomer(newCustomer)

  }

  render() {
    return (
      <div>
        <hr />
        <h5>Add New Customer</h5>
        <Form>
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
            <Button variant="success" id="save-button" onClick={() => this.saveCustomer()}>Save</Button>
          </div>
        </Form>
      </div>
    )
  }
}

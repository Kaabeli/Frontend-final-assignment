import React, { Component } from 'react'
import { getCustomers, addTraining } from './AxiosApi';
import { Button, Form, Col } from 'react-bootstrap';

export default class NewTraining extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            duration: '',
            activity: '',
            customers: [],
            customer: ''
        }
    }

    componentWillMount() {
        this.getCustomers();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
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

    saveTraining = (e) => {
        const newTraining = {
            date: this.state.date,
            activity: this.state.activity,
            duration: this.state.duration,
            customer: this.state.customer
        }
        addTraining(newTraining)
        .then(this.props.getTraining)
    }

    render() {
        const customers = this.state.customers.map((customer, index) =>
            <option key={index} value={customer.links[0].href}>{customer.firstname} {customer.lastname}</option>
        )
        return (
            <div>
                <hr />
                <h5>Add New Training for Customer</h5>
                <Form>

                    <Form.Group>
                        <Form.Label>Select Customer</Form.Label>
                        <Form.Control as="select" onChange={(e) => this.setState({customer: e.target.value})}>
                        <option>-- Select Customer --</option>
                            {customers}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formInlineActivity">
                        <Form.Label>Activity:</Form.Label>
                        <Form.Control type="text" name="activity" placeholder="Enter activity" value={this.state.activity} onChange={this.handleChange}></Form.Control>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date" placeholder="DD-MM-YYYY" value={this.state.date} onChange={this.handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridDuration">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control type="number" name="duration" value={this.state.duration} onChange={this.handleChange}></Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <div id="formButtons">
                        <Button variant="success" id="save-button" onClick={() => this.saveTraining()}>Save</Button>
                    </div>
                    
                </Form>
            </div>
        )
    }
}

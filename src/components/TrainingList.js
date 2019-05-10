import React, { Component } from 'react'
import { getTraining, deleteTraining } from './AxiosApi';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import Button from 'react-bootstrap/Button'
import { Collapse } from 'react-bootstrap';
import NewTraining from './NewTraining';

export default class TrainingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainings: [],
            open: false,
            message: '',
            openTrainingButton: false,
        }
    }

    componentDidMount() {
        this.getTraining();
    }

    getTraining = () => {
        getTraining()
        .then((response) => {
            let data = response.data
            data.map((training, index) => {
                return training.date = moment((training.date)).format('DD/MM/YYYY hh:mm');
            })
            this.setState({
                trainings: data,
            })
        })
        .catch((error) => {
            console.log("Sattuupi tuota virhe:", error);
            
        })
    }

    deleteTraining = training => {
        if (window.confirm("Are you sure you want to delete training?")) {
            deleteTraining(training)
            .then(res => this.getTraining())
            .then(res => this.setState({
                open: true,
                message: "Training removed",
            }))
            .catch(err => console.log("Tapahtuipi poistossa erhe: ", err))
        }
    }

    handleClose = (event, reason) => {
        this.setState({
            open: false,
        })
    }

  render() {
      const { openTrainingButton} = this.state;
      const columns = [{
          Header: 'Training',
          columns: [
              {
                  Header: 'Date',
                  accessor: 'date'
              },
              {
                id: 'customer.id',
                Header: 'Customer',
                accessor: data => `${data.customer.firstname} ${data.customer.lastname}`
              },
              {
                  Header: 'Duration',
                  accessor: 'duration'
              },
              {
                  Header: 'Activity',
                  accessor: 'activity'
              },
              {
                  Header: '',
                  filterable: false,
                  sortable: false,
                  width: 90,
                  accessor: 'links.self.href',
                  Cell: ({ original }) => {
                  return (
                      <Button variant="outline-danger" onClick={() => this.deleteTraining(original.id)}>Delete</Button>
                  )
              }
              }
          ]
      }]
    return (
        <div>
            <div className="button-place">
            <br />
                <Button
                variant="outline-secondary"
                onClick={() => this.setState({
                    openTrainingButton: !openTrainingButton,
                })}
                aria-controls="addTraining"
                aria-expanded={openTrainingButton}>
                {this.state.openTrainingButton ? 'Cancel' : 'Add Training for Customer'}</Button>

                <Collapse in={this.state.openTrainingButton}>
                <div id="AddTraining"><NewTraining /></div>
                </Collapse>
                <hr/>
            </div>
        <div id="trainings">
            <ReactTable 
                data={this.state.trainings}
                defaultPageSize={15}
                filterable={true}
                columns={columns}
                className="-striped -highlight"
            />
        </div>
        </div >
    )
  }
}

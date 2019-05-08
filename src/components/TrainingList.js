import React, { Component } from 'react'
import { getTraining, deleteTraining } from './AxiosApi';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import Button from 'react-bootstrap/Button'

export default class TrainingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainings: [],
            open: false,
            message: '',
        }
    }

    componentDidMount() {
        this.getTraining();
    }

    getTraining = () => {
        getTraining()
        .then((response) => {
            console.log("lol: ", response)
            let data = response.data
            data.forEach(trainings => trainings.date = moment(trainings.data).format("DD/MM/YYYY"))
            this.setState({
                trainings: data,
            })
            console.log("Treenit:", data);
        })
        .catch((error) => {
            console.log("Sattuupi tuota virhe:", error);
            
        })
    }

    deleteTraining = training => {
        console.log("Mitäs: ", training)
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
      const columns = [{
          Header: 'Training',
          columns: [
              {
                  Header: 'Date',
                  accessor: 'date'
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
                  console.log("lol2 :", original)
                  return (
                      <Button variant="outline-danger" onClick={() => this.deleteTraining(original.id)}>Delete</Button>
                  )
              }
              }
            ]
      }]
    return (
        <div id="trainings">
            <ReactTable 
                data={this.state.trainings}
                defaultPageSize={15}
                filterable={true}
                columns={columns}
                className="-striped -highlight"
            />
        </div>
    )
  }
}

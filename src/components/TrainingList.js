import React, { Component } from 'react'
import { getTraining, deleteTraining } from './AxiosApi';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

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
            let data = response.data.content
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
                  accessor: 'links.0.href',
                  Cell: ({ value }) => (
                      <button type="button" className="btn btn-danger" onClick={() => this.deleteTraining(value)}>Delete</button> 
                  )
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

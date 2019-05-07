import React, { Component } from 'react'
import { getTraining } from './AxiosApi';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

export default class TrainingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainings: [],
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
              }]
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

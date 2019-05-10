import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getTraining } from './AxiosApi';
import moment from 'moment';

const localizer = BigCalendar.momentLocalizer(moment)

export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            trainings: []
        }
    }

    componentWillMount() {
        this.getTraining();
    }

    getTraining = () => {
        getTraining()
            .then((response) => {
                let data = response.data
                data.filter((training) =>{
                    if (!training.customer) {
                        return false;
                    }
                    return true;
                })
                this.setState({
                    trainings: data,
                })
                console.log("State: ", this.state.trainings)
            })
            .then(() => this.createEvents())
            .catch((error) => {
                console.log("Sattuupi tuota virhe:", error);

            })
    }

    createEvents = () => {
        let calendarTrainings = [];
        this.state.trainings.map((training, index) => {
            let endTime = moment(training.date).add(training.duration, "minutes").toDate();
            let startTime = moment(training.date).toDate();
            let titleStuff = training.activity ? `${training.customer.firstname} ${training.customer.lastname}, ${training.activity}` : `${training.customer.firstname} ${training.customer.lastname}, ???`;
            return calendarTrainings[index] = {
                id: index,
                title: titleStuff,
                start: startTime,
                end: endTime,
                allDay: false,
            }
        })
        this.setState({
            events: [...calendarTrainings]
        })
        console.log("Eventit: ", this.state.events)
    }

  render() {

    return (
      <div id="calendar">
            <BigCalendar
                showMultiDayTimes={true}
                localizer={localizer}
                events={this.state.events}
                defaultDate={new Date()}
                startAccessor="start"
                endAccessor="end"
                allDayAccessor="allDay"
            />
      </div>
    )
  }
}

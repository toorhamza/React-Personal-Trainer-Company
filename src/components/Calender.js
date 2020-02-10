import React, { Component } from "react";
import {
    Calendar,
    momentLocalizer,
  } from 'react-big-calendar';
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)
  
class Calender extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      }
    ],
    data: []
  };

  componentDidMount() {
        fetch("https://customerrest.herokuapp.com/api/trainings")
          .then(res => res.json())
          .then(json => this.setState({data: json.content}))
          .then (() => loop())
          .catch(e => console.error(e));  
          
        const loop = () => { 
            var event = [];
               for (let i = 0; i < this.state.data.length; i++) {
                let newEvent = {
                    start: this.state.data[i].date,
                    end: moment(this.state.data[i].date).add(this.state.data[i].duration, "minutes"),
                    title: this.state.data[i].activity
                }
         
                event.push(newEvent);
             }
         
             this.setState({events: event});
           }
        
  }
          



  render() {
    return (
      <div className="calender">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "85vh" }}
        />
      </div>
    );
  }
}

export default Calender;
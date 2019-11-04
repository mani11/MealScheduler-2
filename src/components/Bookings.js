import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Bookings extends Component {
  constructor(props){
    super(props)
    this.state={
       hotelGuests:"",
       dates:"",
    }
  }
 handleGuestInfo = (event) => {
    let guestName = event.target.value;
    if(guestName){
    this.setState(prevState => {
      prevState.hotelGuests = guestName;
    });
      }
  }
  handleDateInfo = (event) => {
    let dateRange = event.target.value;
    this.setState(prevState => {
      prevState.dates = dateRange;
    });
  }

  getMealSchedule = (event)=>{
    this.props.getMealSchedule({hotelGuests:this.state.hotelGuests,dates:this.state.dates})
  }


    render() {
        return (
      <div className="row">
        <TextField
          className="col-md-6"
          multiline
          rows="4"
          placeholder="Enter the names (one name per line)"
          onChange={this.handleGuestInfo}
        />
        <TextField
          className="col-md-6"
          multiline
          rows="4"
          placeholder="Enter the date range for each name (one range per line)"
          onChange={this.handleDateInfo}
        />
        <Button variant="outlined" 
                color="primary" 
                className="block-center" 
                onClick={this.getMealSchedule}
                >Get Meals Schedule</Button>
        </div>);
    }
}

export default Bookings;
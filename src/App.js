import React, { Component } from 'react';
import Bookings from './components/Bookings';
import Meals from './components/Meals';
import Error from './components/Error';
import sortMeals from './sorter/meals';
import moment from 'moment';


class App extends Component {
   /**
    * 
    * @param {*} props 
    * Maintaing the state for the app
    * MealScheduleList: A map of the meal list for the start and end date of the guests
    * in hotel represented as :
    *  "date": [guestList]
    *    Eg: "2019-10-09":[David,Lilly] 
    *  
    */
    constructor(props) {
        super(props)
        this.state = {
            MealScheduleList: new Map(),
            errorList: []
        }
    }

    /**
     * ListMeals 
     */

    getMealSchedule = (hotel) => {

        const mealSchedule = new Map();
        const errors = [];
        const guests = hotel.hotelGuests.split("\n").filter(g => g !== "");
        const dateRange = hotel.dates.split("\n").filter(d => d !== "");

        for (let i = 0; i < guests.length; i++) {
            let guest = guests[i];
            let tempArr = dateRange[i].split("to");
            let start = tempArr[0] && tempArr[0].trim();
            let end = tempArr[1] && tempArr[1].trim();

            if (!moment(start, "YYYY-MM-DD").isValid() || !moment(end, "YYYY-MM-DD").isValid() || moment(start).isAfter(moment(end))) {
                errors.push(guest);
            }
            else {
                let startValues = mealSchedule.get(moment(start, "YYYY-MM-DD").format("YYYY-M-DD")) || [];
                let endValues = mealSchedule.get(moment(end, "YYYY-MM-DD").format("YYYY-M-DD")) || [];

                if (startValues.indexOf(guest) < 0)
                    startValues.push(guest);
              
                if (endValues.indexOf(guest) < 0)
                    endValues.push(guest);

                mealSchedule.set(moment(start, "YYYY-MM-DD").format("YYYY-M-DD"), startValues);
                mealSchedule.set(moment(end, "YYYY-MM-DD").format("YYYY-M-DD"), endValues);
            }
        }
        this.setState(prevState => {
            return {
                MealScheduleList: new Map(sortMeals([...mealSchedule.entries()])),
                errorList: [...errors]
            }
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <center>
                    <h2>Menu scheduler</h2>
                </center>
                <div className="container">
                    <Bookings getMealSchedule={(hotel) => this.getMealSchedule(hotel)}></Bookings>
                    <Error error={this.state.errorList}></Error>
                    <Meals mealsSchedule={this.state.MealScheduleList}></Meals>
                </div>
            </div>
        );
    }
}

export default App;
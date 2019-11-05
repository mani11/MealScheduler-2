import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

const Meals = ((props) => {

 let listItems=[];

  let breakfastDates =[];
  let lunchDates = [];
  let dinnerDates = [];

  Array.from(props.mealsSchedule).map(([date,guests]) => {
    breakfastDates = guests.map((g,index)=>{
         return <li key={'morning'+index+g+date} className="morning">Breakfast for {g} on {date}</li>
    });

    lunchDates = guests.map((g,index)=>{
       return <li key={'noon'+index+g+date}  className="afternoon">Lunch for {g} on {date}</li>

    });

    dinnerDates = guests.map((g,index)=>{
       return <li key={'night'+index+g+date} className="night">Dinner for {g} on {date}</li>
    });
    listItems = listItems.concat(breakfastDates.concat(lunchDates).concat(dinnerDates));
  });

    return (<div className="col-xs-12  col-sm-12 col-md-12 col-lg-12">
 
  <ol id="list"> 
  {listItems}
  </ol>
                
  </div>);
    
});

  export default Meals;

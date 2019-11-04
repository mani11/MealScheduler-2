//sorter method to sort the map based on dates

import moment from 'moment';

const sortMeals = (meals)=>{

  const result = meals.sort((a,b)=>{
  return moment(a[0]).isBefore(moment(b[0])) ?-1:1;
  })

  return result;

}

export default sortMeals;
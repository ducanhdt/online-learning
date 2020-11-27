import moment from 'moment';

const getAllDateBetweenTwoDays = (startDate, endDate) => {
  const dates = [];

  const currDate = moment(startDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  do {
    dates.push(moment(currDate.clone().toDate()).format('YYYY-MM-DD'));
  } while (currDate.add(1, 'days').diff(lastDate) < 1);

  return dates;
};

export { getAllDateBetweenTwoDays };

const toHoursAndMinutes = (minutesTotal) => {
  const minutes = minutesTotal % 60;
  const hours = Math.floor(minutesTotal / 60);

  if (hours === 0) {
    return `${minutes} min`;
  } else if (minutes === 0) {
    return `${hours} hod`;
  } else {
    return `${hours} hod ${minutes} min`;
  }
};

export default toHoursAndMinutes;

const splitedDirections = (directions) => {
  const splitedDirections = directions.split(/([0-9])\.+ /g);

  return splitedDirections.filter((chars) => chars.length > 1);
};

export default splitedDirections;

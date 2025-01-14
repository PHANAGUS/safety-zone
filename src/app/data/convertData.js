export function changeTimeFormat(datetime, daysEarlier) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = datetime.getDate().toString();
  const month = months[datetime.getMonth()];
  const year = datetime.getFullYear().toString();
  // const minute = datetime.getMinutes().toString();
  const minute =
    Math.floor(datetime.getMinutes() / 10) > 0
      ? datetime.getMinutes().toString()
      : "0" + datetime.getMinutes().toString();
  const hour = datetime.getHours().toString();

  if (daysEarlier <= 3) {
    return `${hour}:${minute}`;
  } else {
    return `${month} ${date} ${year}`;
    // return `${date} ${month}`;
  }
}

export function setTemperatureColor(value) {
  let color = "#87D677";
  if (value < 0) {
    color = "#442e8c"; // purple
  } else if (value > 0 && value < 10) {
    color = "#283f9c"; // navy
  } else if (value >= 10 && value < 20) {
    color = "#7ED2F0"; // sky blue
  } else if (value >= 20 && value < 25) {
    color = "#87D677"; // green
  } else if (value >= 25 && value < 30) {
    color = "#87D677"; // green
  } else if (value >= 30 && value < 35) {
    color = "#e69430"; // orange
  } else if (value >= 35 && value <= 40) {
    color = "#e65a30"; // red orange
  } else {
    color = "#d63429"; // red
  }
  return color;
}

export function setHumidityColor(value) {
  let color = "#87D677"; // green
  if (value >= 0 && value <= 10) {
    color = "#753d2f"; // brown
  } else if (value > 10 && value <= 20) {
    color = "#e65a30"; // red orange
  } else if (value > 20 && value <= 40) {
    color = "#e69430"; // orange
  } else if (value > 40 && value <= 60) {
    color = "#87D677"; // green
  } else if (value > 60 && value <= 70) {
    color = "#7ED2F0"; // sky blue
  } else if (value > 70 && value <= 80) {
    color = "#71aeeb"; // indigo blue
  } else if (value > 80 && value <= 90) {
    color = "#283f9c"; // navy
  } else {
    color = "#442e8c"; // purple
  }
  return color;
}

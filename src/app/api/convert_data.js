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

export function setPm25Color(value) {
  let color = "#D9D9D9"; // grey
  if (value >= 0 && value <= 12) {
    color = "#87D677"; // green
  } else if (value >= 12.1 && value <= 35.4) {
    color = "#fadc46"; // yellow
  } else if (value >= 35.5 && value <= 55.4) {
    color = "#e69430"; // orange
  } else if (value >= 55.5 && value <= 150.4) {
    color = "#d63429"; // red
  } else if (value >= 150.5 && value <= 250.4) {
    color = "#442e8c"; // purple
  } else if (value > 250.4) {
    color = "#753d2f"; // brown
  } else {
    color = "#D9D9D9"; // grey
  }
  return color;
}

export function setCo2Color(value) {
  let color = "#D9D9D9"; // grey
  if (value < 400) {
    color = "#87D677"; // green
  } else if (value >= 400 && value <= 600) {
    color = "#87D677"; // green
  } else if (value >= 601 && value <= 1000) {
    color = "#fadc46"; // yellow
  } else if (value >= 1001 && value <= 2000) {
    color = "#e69430"; // orange
  } else if (value >= 2001 && value <= 5000) {
    color = "#d63429"; // red
  } else if (value >= 5001 && value <= 40000) {
    color = "#442e8c"; // purple
  } else if (value > 40000) {
    color = "#363636"; // black
  } else {
    color = "#D9D9D9"; // grey
  }
  return color;
}

export function setPressureColor(value) {
  let color = "#D9D9D9"; // grey
  if (value < 0) {
    color = "#d63429"; // red
  } else if (value >= 0 && value < 3) {
    color = "#e69430"; // orange
  } else if (value >= 3 && value <= 8) {
    color = "#87D677"; // green
  } else if (value > 8 && value <= 15) {
    color = "#fadc46"; // yellow
  } else if (value > 15) {
    color = "#442e8c"; // purple
  } else {
    color = "#D9D9D9"; // grey
  }
  return color;
}

export function setTemperatureColor(value) {
  let color = "#D9D9D9"; // grey
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
  } else if (value > 40) {
    color = "#d63429"; // red
  } else {
    color = "#D9D9D9"; // grey
  }
  return color;
}

export function setHumidityColor(value) {
  let color = "#D9D9D9"; // grey
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
  } else if (value > 90) {
    color = "#442e8c"; // purple
  } else {
    color = "#D9D9D9"; // grey
  }
  return color;
}

function generateTimes(start, end) {
  const times = [];
  let [hour, minute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  while (hour < endHour || (hour === endHour && minute < endMinute)) {
    times.push(
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
    );

    minute += 30;

    if (minute >= 60) {
      hour += 1;
      minute = 0;
    }
  }

  return times;
}

export default generateTimes;
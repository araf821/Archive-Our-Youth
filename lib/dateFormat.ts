export function dateFormat(date: string) {
  const [year, month, day] = date.split("T")[0].split("-");
  let dateToString = "";

  switch (month) {
    case "01":
      dateToString = "Jan";
      break;

    case "02":
      dateToString = "Feb";
      break;

    case "03":
      dateToString = "Mar";
      break;

    case "04":
      dateToString = "Apr";
      break;

    case "05":
      dateToString = "May";
      break;

    case "06":
      dateToString = "Jun";
      break;

    case "07":
      dateToString = "Jul";
      break;

    case "08":
      dateToString = "Aug";
      break;

    case "09":
      dateToString = "Sept";
      break;

    case "10":
      dateToString = "Oct";
      break;

    case "11":
      dateToString = "Nov";
      break;

    case "12":
      dateToString = "Dec";
      break;

    default:
      break;
  }

  return `${dateToString} ${day}, ${year}`;
}

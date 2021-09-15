export const truncateTextIfMoreThan300 = (str: string) => {
  if (str.length > 300) {
    return str.substring(0, 297) + "...";
  }
  return str;
};

export const formatISO = (date: string, type: string) => {
  return formatDate(new Date(date), type);
};

export const formatDate = (date: Date, type: string) => {
  if (type === "d/m") {
    return [date.getDate(), date.getMonth() + 1].join("/");
  }

  if (type === "d/m/y") {
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/");
  }

  if (type === "d mm y") {
    return [
      date.getDate(),
      monthConverter(date.getMonth() + 1),
      date.getFullYear(),
    ].join(" ");
  }

  return date.toString();
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const monthConverter = (month: number) => {
  switch (month) {
    case 1:
      return "January";
    case 2:
      return "Febuary";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "-";
  }
};

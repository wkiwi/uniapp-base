export function getDaysInMonth(year, month) {
  let day;
  if (year instanceof Date) {
    day = new Date(year);
  } else {
    day = new Date(year, month + 1);
  }
  day.setDate(0);
  return day.getDate();
}

export function toDateData(date) {
  if (typeof date === 'number') {
    date = new Date(date);
  }
  if (date instanceof Date) {
    return {
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    };
  }
  return date;
}

export function fromDateData({ year, month, date }) {
  return new Date(year, month, date);
}

export function toDate(date) {
  if (typeof date === 'number') {
    return new Date(date);
  } else if ('date' in date && 'month' in date && 'year' in date) {
    return fromDateData(date);
  }
  return date;
}


export function getSendMessageDate() {
	let myDate = new Date();
	let year = myDate.getFullYear();
	let month = myDate.getMonth() + 1;
	month = month < 10 ? '0' + month : month; 
	let day = myDate.getDate(); 
	day = day < 10 ? '0' + day : day; 
	let h = myDate.getHours(); 
	h = h < 10 ? '0' + h : h; 
  let m = myDate.getMinutes(); 
	m = m < 10 ? '0' + m : m; 
	let s = myDate.getSeconds(); 
	s = s < 10 ? '0' + s : s; 
  return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
}

function DateFormatter() {}

DateFormatter.day_array = new Array("Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre");

DateFormatter.convertMonthToNumber = function(month) {
  var index_month = DateFormatter.day_array.indexOf(month) + 1;
  return (DateFormatter.formatWithTwoNumbers(index_month));
}

DateFormatter.formatWithTwoNumbers = function(number) {
  if ((number.length == 0) || (number < 10) ) {
    number = "0" + number;
  }
  return (number);
}

module.exports = DateFormatter;

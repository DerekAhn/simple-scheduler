$(function() {

  var cal = $('#calendar').calendario({ startIn: 0 }),
      $month = $('#custom-month').html(cal.getMonthName()),
      $year = $('#custom-year').html(cal.getYear()),
      $currentYear = $('#current-year').attr('data');

  $('#custom-next').on('click', function() {
    cal.gotoNextMonth(updateMonthYear);
  });
  $('#custom-prev').on('click', function() {
    cal.gotoPreviousMonth(updateMonthYear);
  });
  $('#custom-current').on('click', function() {
    cal.gotoNow(updateMonthYear);
  });
  updateCalendar($currentYear);
  function updateCalendar(year) {
    $.getJSON('/shifts/' + year, function(json) {
      var shiftData = {};
      var element;
      _.forEach(json, function(shift, i) {
          shiftData[shift.date] = '';
        _.forEach(shift.employees, function(emp, i) {
          element = '<div class="' + shift.shift + '">' + '<li>' + emp + '</li></div>';
          shiftData[shift.date] += element;
        });
      });
      // console.log(shiftData);
      cal.setData(shiftData);
    });
  }

  function updateMonthYear() {
    $month.html(cal.getMonthName());
    $year.html(cal.getYear());
  }

});
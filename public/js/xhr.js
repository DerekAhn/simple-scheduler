$(function() {

  $(".datepicker").datepicker();

  $('.add-worker').click(function(e) {
    var plusOneEmployee = $('.selectEmployee').html();
    $('.employee-container').append(plusOneEmployee);
  });

  $('body').on('click', '.delete-worker', function() {
    var rowAmt = $('.selectEmployee').siblings('.row').length;
    if (location.pathname === '/admin') {
      if (rowAmt > 0) {
        $(this).closest('.row').remove();
      } else {
        alert('Must have at least one worker');
      }
    } else {
      $(this).closest('.row').remove();
    }
  });

  $('.edit.delete-btn').click(function(e) {
    var button = $(this);
    var check = confirm('Are you sure you want to delete?');
    if (check) {
      $.ajax(button.attr('href'), {
        method: 'DELETE',
        success: function(result) {
          button.closest('.employee-selection').remove();
        }
      });
    }
  });

  $('#delete-shift-btn').click(function(e) {
    if(!confirm('Are you sure you want to delete?')) {
      e.preventDefault();
    }
  });

  $('.form').submit(function(e) {

    e.preventDefault();
    var $route = $('.route-path').attr('data');

    $.post($route, $('.form').serialize())
      .done(function(data) {
        if (data.valid) {
          $('.ajax-success').prepend(data.msg).css('padding', '20px');
          $('form.form').hide();
          setTimeout(function() {
            $('.ajax-success').fadeOut("slow");
          }, 3000);
        } else {
          $('.ajax-fail').prepend(data.msg).css('padding', '20px');
          setTimeout(function() {
            $('.ajax-fail').fadeOut("slow");
          }, 3000);
        }
      })
      .fail(function(data) {
        $('.ajax-fail').prepend('Ajax failure').css('padding', '20px');
      })
      .always(function() {
        console.info('Finished with ');
      });
  });

});
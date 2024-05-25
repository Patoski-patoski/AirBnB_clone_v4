/**
* Listen for changes on each input checkbox tag:
* if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
* if the checkbox is unchecked, you must remove the Amenity ID from the variable
* update the h4 tag inside the div Amenities with the list of Amenities checked
**/

$(function () {
  const amenities = {};

  $("input[type='checkbox']").on('change', () => {
    if (this.checked) {
	amenities[$(this).data('id')] = $(this).data('name');
    }
    else {
      delete amenities[$(this).data('id')];
    }

    $('div.amenities h4').text(Object.values(amenities).join(', '));
 });
});

// Request http://0.0.0.0:5001/api/v1/status/
$.get('http://0.0.0.0:5001/api/v1/status/', (data, textStatus) => {
  if (textStatus === 'success') {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
});

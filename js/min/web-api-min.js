$(document).ready(function() {


 $('#flickr-submit').click(function (evt) {
 	evt.preventDefault();
    // highlight the button
    // not AJAX, just cool looking
   
    

    // the AJAX part
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var animal = $('#flickr-search').val();
    var flickrOptions = {
      tags: animal,
      format: "json"
    };
    function displayPhotos(data) {
      var photoHTML = '<ul class="photos">';
      $.each(data.items,function(i,photo) {
        photoHTML += '<li class="pics">';
        photoHTML += '<a href="' + photo.link + '" class="thumbnails">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); // end each
      photoHTML += '</ul>';
      $('.gallery').html(photoHTML);
    }
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);

     }); // end click

}); // end ready





$(document).ready(function() {


    $('#flickr-submit').click(function(evt) {
        evt.preventDefault();
        // highlight the button
        // not AJAX, just cool looking



        // the AJAX part
        //var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        var spotify_url = "https://api.spotify.com/v1/search";
        var artist = $('#flickr-search').val().toLowerCase();

        var spotifyOptions = {
            q: artist,
            type: "album"
        }



        // function displayPhotos(response){

        // 	console.log(response.artists.items[18].images[2].url);

        // };

        function displayPhotos(data) {

            console.log(data);
            var koory = data.albums.items[2].images;
            var ghoory = data.albums.items;



            var jasem = [];
            $.each(ghoory, function(i, photo) {
                if (photo.images.length > 0) {
                    var bandInfo = {
                        "id": photo.id,
                        "name": photo.name,
                        "href": photo.href,
                        "image": photo.images[0].url
                    };
                }
                jasem.push(bandInfo);

            }); // end each
            console.log(jasem);
            // var jakesh = '<img src="'+ jasem[2].image +'">';
            // $('.gallery').append(jakesh);
           



            var photoHTML = '<ul class="photos">';
            var i;
            //for (i = 0; i < jasem.length; i++) {
              $.each(jasem,function(index,value){
                 photoHTML += '<li class="pics">';
                photoHTML += '<a href="' + value.href+ '" class="thumbnails">';
                photoHTML += '<img src="' + value.image+ '"></a></li>';

              });  
            photoHTML += '</ul>';
            $('.gallery').html(photoHTML);




        }



        $.getJSON(spotify_url, spotifyOptions, displayPhotos);

    }); // end click
}); // end ready



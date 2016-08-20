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
            type: "artist"
        }



        // function displayPhotos(response){

        // 	console.log(response.artists.items[18].images[2].url);

        // };

        function displayPhotos(data) {


            var koory = data.artists.items[2].images;
            var ghoory = data.artists.items;



            var jasem = [];
            $.each(data.artists.items, function(i, photo) {
                if (photo.images.length > 0) {
                    var bandInfo = {
                        "id": photo.id,
                        "name": photo.name,
                        "href": photo.href,
                        "image": photo.images
                    };
                }
                jasem.push(bandInfo);

            }); // end each
            console.log(jasem);
            console.log(jasem[0].image["0"].url);



            var photoHTML = '<ul class="photos">';
            var i;
            for (i = 0; i < jasem.length; i++) {

                photoHTML += '<li class="pics">';
                photoHTML += '<a href="' + jasem[i].href + '" class="thumbnails">';
                photoHTML += '<img src="' + jasem[i].image["0"].url + '"></a></li>';

            }



            photoHTML += '</ul>';
            $('.gallery').html(photoHTML);




        }



        $.getJSON(spotify_url, spotifyOptions, displayPhotos);

    }); // end click
}); // end ready



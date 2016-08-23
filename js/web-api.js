$(document).ready(function() {
    var retrieved = [];




    $('#flickr-submit').click(function(evt) {
        evt.preventDefault();
        var spotify_url = "https://api.spotify.com/v1/search";
        var artist = $('#flickr-search').val().toLowerCase();
        var spotifyOptions = {
            q: artist,
            type: "album"
        };


        function displayPhotos(data) {

            
            $.each(data.albums.items, function(i, photo) {
                if (photo.images.length > 0) {
                    var bandInfo = {
                        "id": photo.id,
                        "name": photo.name,
                        "href": photo.href,
                        "image": photo.images[0].url
                    };
                    retrieved.push(bandInfo);
                }

            }); // end each

               function fetchDetails() {
                $.each(retrieved, function(index, item) {
                    var url = item.href;
                    $.getJSON(url)
                        .done(function(response) {
                            retrieved[index].details = response;
                        });
                });
            }
            fetchDetails();


            console.log(data);

            var photoHTML = '';
            //for (i = 0; i < retrieved.length; i++) {
            $.each(retrieved, function(index, value) {
                photoHTML += '<div class="photos">';
                photoHTML += '<img src="' + value.image + '"></div>';
            });
            photoHTML += '</div>';
            $('.gallery').html(photoHTML);
        }
        console.log(retrieved);
        $.getJSON(spotify_url, spotifyOptions, displayPhotos);
    }); // end click

    // click on pics to open the light gallery g




    $('.gallery').on('click', 'img', function() {
        var chosen_image = $(this).attr("src");
        var chosen_url = $(this).attr("data-href");


        $('.overlay-poster').attr("src", chosen_image);

        $('#overlay').addClass('open');


    });

    $('#overlay').click(function() {
        $('#overlay').removeClass('open');

    });








}); // end ready

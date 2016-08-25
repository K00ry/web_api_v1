$(document).ready(function() {

    var newRetrived = [];
    var limit = 10;
    var retrieved = [];








    $('#flickr-submit').click(function(evt) {
        evt.preventDefault();
        $('.gallery').empty();
        retrieved = [];
        var artist = $('#flickr-search').val().split(" ").join("+");


        var spotify_url = "https://api.spotify.com/v1/search";


        var spotifyOptions = {
            q: artist,
            type: "album",
            limit: limit
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

            fetchDetails(retrieved);

            galleryBuilt();
        }

        $.getJSON(spotify_url, spotifyOptions, displayPhotos);














    }); // end submit

    //$('.gallery').empty();

    ////////////// FUNCTIONS \\\\\\\\\\\\\\\

    function galleryBuilt() {

        var photoHTML = '';
        $.each(retrieved, function(index, value) {
            photoHTML += '<div class="photos">';
            photoHTML += '<img src="' + value.image + '" alt=" ' + value.name + ' ">';
            photoHTML += '</div>';
        });

        $('.gallery').append(photoHTML);
    }


    function fetchDetails(got) {
        $.each(got, function(index, item) {
            var url = item.href;
            $.getJSON(url)
                .done(function(response) {
                    retrieved[index].details = response;
                });
        });
    }

    function rightPoster(rightIndex) {
        $('.overlay-poster').attr("src", newRetrived[rightIndex].poster);
    }


    function albumInfo(rightIndex) {
        $('.artist').html('<span>Artist :</span> ' + newRetrived[rightIndex].name_band);
        $('.album').html('<span>album :</span> ' + newRetrived[rightIndex].name_album);
        $('.release').html('<span>Release Date :</span> ' + newRetrived[rightIndex].release_date);
    }
    // function to make a table of tracks by the artist

    function tableMaker(rightIndex) {
        var table = '';
        $.each(newRetrived[rightIndex].tracks_arr.items, function(index, item) {
            table += '<tr><td>' + item.track_number + '. ' + item.name + '</td></tr>';

        });
        $('.replace-table').html(table);
    }


    // function to  make a new array with updated json

    function usableInfo() {
        $.each(retrieved, function(index, item) {
            var newRetrivedObject = {
                "index": index,
                "name_album": item.name,
                "name_band": item.details.artists["0"].name,
                "release_date": item.details.release_date,
                "tracks_arr": item.details.tracks,
                "poster": item.details.images["0"].url
            };
            newRetrived.push(newRetrivedObject);
        });
    }








    ////////////// click on pics to open the light gallery \\\\\\\\\\\
    var clicked_index;


    $('.gallery').on('click', 'div', function() {

        clicked_index = $(this).index();
        usableInfo();
        albumInfo(clicked_index);
        tableMaker(clicked_index);
        rightPoster(clicked_index);

        $('#overlay').addClass('open').css("display", "flex");


    }); // end album click







    $('#overlay').click(function() {

        $('#overlay').removeClass('open');

    });

    ////////////// left and right arrows \\\\\\\\\\\\\\

    $('.left-arrow').click(function(evt) {
        evt.stopPropagation();


        if (clicked_index > 0) {
            clicked_index -= 1;
            albumInfo(clicked_index);
            tableMaker(clicked_index);
            rightPoster(clicked_index);
        } else if (clicked_index === 0) {
            clicked_index = 9;
            albumInfo(clicked_index);
            tableMaker(clicked_index);
            rightPoster(clicked_index);
        }
    });


    $('.right-arrow').click(function(evt) {
        evt.stopPropagation();
        if (clicked_index <= 8) {
            clicked_index += 1;
            albumInfo(clicked_index);
            tableMaker(clicked_index);
            rightPoster(clicked_index);
        } else if (clicked_index === 9) {
            clicked_index = 0;
            albumInfo(clicked_index);
            tableMaker(clicked_index);
            rightPoster(clicked_index);
        }
    });






}); // end ready

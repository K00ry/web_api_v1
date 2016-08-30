$(document).ready(function() {


    var limit = 10;
    var retrieved = [];
    var newRetrived = [];

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




        $.getJSON(spotify_url, spotifyOptions).done(function(data) {

            $.each(data.albums.items, function(i, photo) {
                if (photo.images.length > 0) {
                    var bandInfo = {
                        "id": photo.id,
                        "name": photo.name,
                        "href": photo.href,
                        "image": photo.images[0].url
                    };
                    retrieved.push(bandInfo);
                    fetchDetails(retrieved);

                }

            }); // end each
            //
            $('.covers').removeAttr('data-created');

            galleryBuilt(retrieved);


        });





        $('.sort').css("display", "flex");

    }); // end submit





    ////////////// FUNCTIONS \\\\\\\\\\\\\\\




    //// flickr call 

    function flickrCall(tag) {

        var flickr_url = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        var flickrOptions = {
            tags: tag,
            tagmode: "any",
            format: "json"
        };

        function displayPhotos(response) {
            var flickrPhotos = '';
            $.each(response.items, function(index, item) {
                if (index === 5) {
                    return false;
                }
                flickrPhotos += '<div class="flickr-photos">';
                flickrPhotos += '<img src=" ' + item.media.m + ' " alt=" ' + item.media.tags + ' ">';
                flickrPhotos += '</div>';
            }); //end each
            $(".flickr-show").hide().html(flickrPhotos).fadeIn('slow');
        } // end function
        $.getJSON(flickr_url, flickrOptions, displayPhotos);
    }

    // function for building the gallery items 

    function galleryBuilt(array) {
        $(".gallery").empty();
        var photoHTML = '';
        $.each(array, function(index, value) {
            photoHTML += '<div class="covers">';
            photoHTML += '<img src="' + value.image + '" alt=" ' + value.name + '">';
            photoHTML += '</div>';
        });

        $('.gallery').hide().html(photoHTML).fadeIn('slow');
    }

    function gallerySortBuilt(array) {
        $(".gallery").empty();
        var photoHTML = '';
        $.each(array, function(index, value) {
            photoHTML += '<div class="covers">';
            photoHTML += '<img src="' + value.poster + '" alt=" ' + value.name_album + '">';
            photoHTML += '</div>';
        });

        $('.gallery').hide().html(photoHTML).fadeIn('slow');
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
        $('.overlay-poster').attr({
            src: newRetrived[rightIndex].poster,
            alt: newRetrived[rightIndex].release_date
        }).hide().fadeIn();
    }


    function albumInfo(rightIndex) {
        $('.artist').hide().html('<span>Artist :</span> ' + newRetrived[rightIndex].name_band).fadeIn();
        $('.album').hide().html('<span>album :</span> ' + newRetrived[rightIndex].name_album).fadeIn();
        $('.release').hide().html('<span>Release Date :</span> ' + newRetrived[rightIndex].release_date).fadeIn();
    }
    // function to make a table of tracks by the artist

    function tableMaker(rightIndex) {
        var table = '';
        $.each(newRetrived[rightIndex].tracks_arr.items, function(index, item) {
            table += '<tr><td>' + item.track_number + '. ' + item.name + '</td></tr>';

        });
        $('.replace-table').hide().html(table).fadeIn();
    }


    // function to  make a new array with updated json

    function usableInfo(array) {
        $.each(array, function(index, item) {
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

    function sortRetrieved() {
        newRetrived.sort(function(a, b) {
            return parseFloat(a.release_date) - parseFloat(b.release_date);
        });
    }




    // function for all the change in overlay for the clicks 

    function rotate(rightIndex) {
        flickrCall(retrieved[rightIndex].name);
        albumInfo(rightIndex);
        tableMaker(rightIndex);
        rightPoster(rightIndex);
    }







    ////////////// click on pics to open the light gallery  \\\\\\\\\\\

    var clicked_index;
    var sorted_index;
    $('.gallery').on('click', 'div', function() {

        var attr = $(this).attr('data-created');
        if (typeof attr !== typeof undefined && attr !== false) {
            sorted_index = $(this).attr("data-created");
            
            

            flickrCall(newRetrived[sorted_index].name_album);
            albumInfo(sorted_index);
            tableMaker(sorted_index);
            rightPoster(sorted_index);
        } else {
            clicked_index = $(this).index();
            newRetrived = [];
            flickrCall(retrieved[clicked_index].name);
            usableInfo(retrieved);
            albumInfo(clicked_index);
            tableMaker(clicked_index);
            rightPoster(clicked_index);

        }

        $('#overlay').addClass('open').css("display", "flex");

    }); // end album click




    // click to close the over lay
    $('#overlay').click(function() {

        $('#overlay').removeClass('open');
         clicked_index = undefined;
    sorted_index = undefined;


    });

    ////////////// left and right arrows \\\\\\\\\\\\\\

    $('.left-arrow').click(function(evt) {
        evt.stopPropagation();
        var galleryLength = $('.gallery').children().length;


        if (sorted_index === undefined && clicked_index > 0) {
            clicked_index -= 1;
            rotate(clicked_index);
        } else if (sorted_index === undefined && clicked_index === 0) {
            clicked_index = galleryLength - 1;
            rotate(clicked_index);
        } else if (clicked_index === undefined && sorted_index > 0) {
            sorted_index -= 1;
            rotate(sorted_index);
        } else if (clicked_index === undefined && sorted_index === 0) {
            sorted_index = galleryLength - 1;
            rotate(sorted_index);
        }
    });


    $('.right-arrow').click(function(evt) {
        evt.stopPropagation();
        var galleryLength = $('.gallery').children().length;
        if (sorted_index === undefined && clicked_index <= galleryLength - 2) {
            clicked_index += 1;
            rotate(clicked_index);
        } else if (sorted_index === undefined && clicked_index === galleryLength - 1) {
            clicked_index = 0;
            rotate(clicked_index);
        } else if (clicked_index === undefined && sorted_index <= galleryLength - 2) {
            sorted_index += 1;
            rotate(sorted_index);
        } else if (clicked_index === undefined && sorted_index === galleryLength - 1) {
            sorted_index = 0;
            rotate(sorted_index);
        }
    });




    // sorting


    $('.date').click(function() {
        //refressh the array of data
        
        newRetrived = [];
        usableInfo(retrieved);

        sortRetrieved();
        gallerySortBuilt(newRetrived);

        $('.covers').each(function(index) {
            $(this).attr("data-created", index);
        });


    });








}); // end ready

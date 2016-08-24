$(document).ready(function() {
    var retrieved = [];
    var limit = 20;







    $('#flickr-submit').click(function(evt) {

        //////////////// spotify request\\\\\\\\\\\
        evt.preventDefault();
        var spotify_url = "https://api.spotify.com/v1/search";
        var artist = $('#flickr-search').val().toLowerCase();
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

            }); // end each

            /////////////// twitter request \\\\\\\\\\\

            var twitter_url = "https://search.twitter.com/search.json?";
        var artist_tweets = $('#flickr-search').val().toLowerCase();
        var twitterOptions = {
            q: artist_tweets,
            type: "json",
            limit: limit
        };
            function displayTweets(data){
                console.log(data)


            }
            $.getJSON(twitter_url,twitterOptions,displayTweets);







            /// gallery build up
            var photoHTML = '';
            //for (i = 0; i < retrieved.length; i++) {
            $.each(retrieved, function(index, value) {
                photoHTML += '<div class="photos">';
                photoHTML += '<img src="' + value.image + '" alt=" '+ value.name+' ">';
                photoHTML += '</div>';
            });
            
            $('.gallery').html(photoHTML);
        }
        console.log(retrieved);
        $.getJSON(spotify_url, spotifyOptions, displayPhotos);



    }); // end submit


    ////////////// click on pics to open the light gallery g


    

    $('.gallery').on('click', 'div', function() {
        
        var clicked_index = $(this).index();
         var newRetrived = [];
        $.each(retrieved, function(index, item) {
                var newRetrivedObject = {
                    "index": index,
                    "name_album": item.name,
                    "name_band": item.details.artists["0"].name,
                    "release_date" : item.details.release_date,
                    "tracks_arr" : item.details.tracks,
                    "poster" : item.details.images["0"].url
                };
                newRetrived.push(newRetrivedObject);
            });

            $('.artist').html('<span>Artist :</span> ' + newRetrived[clicked_index].name_band);
            $('.album').html('<span>album :</span> ' + newRetrived[clicked_index].name_album);
            $('.release').html('<span>Release Date :</span> ' + newRetrived[clicked_index].release_date);
             console.log(newRetrived);

             

         var chosen_image = newRetrived[clicked_index].poster;    
        $('.overlay-poster').attr("src", chosen_image);
        $('#overlay').addClass('open').css("display","flex");
    });// end album click

   

    $('#overlay').click(function() {
        $('#overlay').removeClass('open');
    });








}); // end ready

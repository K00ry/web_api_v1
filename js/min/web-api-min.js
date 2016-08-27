<<<<<<< HEAD
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

        function displayAlbums(data) {

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

            console.log(retrieved);

=======
>>>>>>> flicr-test
=======
>>>>>>> flicr-test
=======
>>>>>>> flicr-test
            galleryBuilt();
        }

        $.getJSON(spotify_url, spotifyOptions, displayAlbums);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> flicr-test


<<<<<<< HEAD
    }); // end submit
=======
=======
>>>>>>> flicr-test



    }); // end submit


    }); // end submit

    ////////////// FUNCTIONS \\\\\\\\\\\\\\\


    ////////////// FUNCTIONS \\\\\\\\\\\\\\\


    //// flickr call 

    function FlickrCall(tag) {

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> flicr-test
        var flickr_url = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        var flickrOptions = {
            tags: tag,
            tagmode: "any",
            format: "json"
            
        };
<<<<<<< HEAD

        function displayPhotos(response) {

=======
    //// flickr call 

    function FlickrCall(tag) {

        var flickr_url = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        var flickrOptions = {
            tags: tag,
            tagmode: "any",
            format: "json"
            
        };

        function displayPhotos(response) {

>>>>>>> flicr-test
            console.log(response.items);
            var flickrPhotos = '';
            $.each(response.items, function(index, item) {
                 if (index === 5){
                    return false;
                }
                flickrPhotos += '<div class="flickr-photos">';
                flickrPhotos += '<img src=" ' + item.media.m + ' " alt=" ' + item.media.tags + ' ">';
                flickrPhotos += '</div>';

            }); //end each
            $(".flickr-show").html(flickrPhotos);
        } // end function
        $.getJSON(flickr_url, flickrOptions, displayPhotos);
    }
<<<<<<< HEAD
>>>>>>> flicr-test


<<<<<<< HEAD
 //-------////////////// FUNCTIONS \\\\\\\\\\\\\\\----------\\
=======
>>>>>>> flicr-test
=======


>>>>>>> flicr-test
=======

        function displayPhotos(response) {

            console.log(response.items);
            var flickrPhotos = '';
            $.each(response.items, function(index, item) {
                 if (index === 5){
                    return false;
                }
                flickrPhotos += '<div class="flickr-photos">';
                flickrPhotos += '<img src=" ' + item.media.m + ' " alt=" ' + item.media.tags + ' ">';
                flickrPhotos += '</div>';

            }); //end each
            $(".flickr-show").html(flickrPhotos);
        } // end function
        $.getJSON(flickr_url, flickrOptions, displayPhotos);
    }


>>>>>>> flicr-test

    function galleryBuilt() {

        var photoHTML = '';
        $.each(retrieved, function(index, value) {
            photoHTML += '<div class="covers">';
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

        var flickr_albumCovers = retrieved[clicked_index].name;
        console.dir(flickr_albumCovers);
        FlickrCall(flickr_albumCovers);
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


=======
$(document).ready(function(){function a(a){function e(a){console.log(a.items);var e="";$.each(a.items,function(a,t){return 5===a?!1:(e+='<div class="flickr-photos">',e+='<img src=" '+t.media.m+' " alt=" '+t.media.tags+' ">',void(e+="</div>"))}),$(".flickr-show").html(e)}var t="https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",n={tags:a,tagmode:"any",format:"json"};$.getJSON(t,n,e)}function e(){var a="";$.each(o,function(e,t){a+='<div class="covers">',a+='<img src="'+t.image+'" alt=" '+t.name+' ">',a+="</div>"}),$(".gallery").append(a)}function t(a){$.each(a,function(a,e){var t=e.href;$.getJSON(t).done(function(e){o[a].details=e})})}function n(a){$(".overlay-poster").attr("src",c[a].poster)}function i(a){$(".artist").html("<span>Artist :</span> "+c[a].name_band),$(".album").html("<span>album :</span> "+c[a].name_album),$(".release").html("<span>Release Date :</span> "+c[a].release_date)}function s(a){var e="";$.each(c[a].tracks_arr.items,function(a,t){e+="<tr><td>"+t.track_number+". "+t.name+"</td></tr>"}),$(".replace-table").html(e)}function r(){$.each(o,function(a,e){var t={index:a,name_album:e.name,name_band:e.details.artists[0].name,release_date:e.details.release_date,tracks_arr:e.details.tracks,poster:e.details.images[0].url};c.push(t)})}var c=[],l=10,o=[];$("#flickr-submit").click(function(a){function n(a){$.each(a.albums.items,function(a,e){if(e.images.length>0){var t={id:e.id,name:e.name,href:e.href,image:e.images[0].url};o.push(t)}}),t(o),e()}a.preventDefault(),$(".gallery").empty(),o=[];var i=$("#flickr-search").val().split(" ").join("+"),s="https://api.spotify.com/v1/search",r={q:i,type:"album",limit:l};$.getJSON(s,r,n)});var m;$(".gallery").on("click","div",function(){m=$(this).index();var e=o[m].name;console.dir(e),a(e),r(),i(m),s(m),n(m),$("#overlay").addClass("open").css("display","flex")}),$("#overlay").click(function(){$("#overlay").removeClass("open")}),$(".left-arrow").click(function(a){a.stopPropagation(),m>0?(m-=1,i(m),s(m),n(m)):0===m&&(m=9,i(m),s(m),n(m))}),$(".right-arrow").click(function(a){a.stopPropagation(),8>=m?(m+=1,i(m),s(m),n(m)):9===m&&(m=0,i(m),s(m),n(m))})});
>>>>>>> flicr-test

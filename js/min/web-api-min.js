$(document).ready(function(){function a(a){function e(a){var e="";$.each(a.items,function(a,t){return 5===a?!1:(e+='<div class="flickr-photos">',e+='<img src=" '+t.media.m+' " alt=" '+t.media.tags+' ">',void(e+="</div>"))}),$(".flickr-show").hide().html(e).fadeIn("slow")}var t="https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",i={tags:a,tagmode:"any",format:"json"};$.getJSON(t,i,e)}function e(a){$(".gallery").empty();var e="";$.each(a,function(a,t){e+='<div class="covers">',e+='<img src="'+t.image+'" alt=" '+t.name+'">',e+="</div>"}),$(".gallery").hide().html(e).fadeIn("slow")}function t(a){$(".gallery").empty();var e="";$.each(a,function(a,t){e+='<div class="covers">',e+='<img src="'+t.poster+'" alt=" '+t.name_album+'">',e+="</div>"}),$(".gallery").hide().html(e).fadeIn("slow")}function i(a){$.each(a,function(a,e){var t=e.href;$.getJSON(t).done(function(e){m[a].details=e})})}function n(a){$(".overlay-poster").attr({src:f[a].poster,alt:f[a].release_date}).hide().fadeIn()}function s(a){$(".artist").hide().html("<span>Artist :</span> "+f[a].name_band).fadeIn(),$(".album").hide().html("<span>album :</span> "+f[a].name_album).fadeIn(),$(".release").hide().html("<span>Release Date :</span> "+f[a].release_date).fadeIn()}function r(a){var e="";$.each(f[a].tracks_arr.items,function(a,t){e+="<tr><td>"+t.track_number+". "+t.name+"</td></tr>"}),$(".replace-table").hide().html(e).fadeIn()}function l(a){$.each(a,function(a,e){var t={index:a,name_album:e.name,name_band:e.details.artists[0].name,release_date:e.details.release_date,tracks_arr:e.details.tracks,poster:e.details.images[0].url};f.push(t)})}function c(){f.sort(function(a,e){return parseFloat(a.release_date)-parseFloat(e.release_date)})}function o(e){a(m[e].name),s(e),r(e),n(e)}var d=10,m=[],f=[];$("#flickr-submit").click(function(a){a.preventDefault(),$(".gallery").empty(),m=[];var t=$("#flickr-search").val().split(" ").join("+"),n="https://api.spotify.com/v1/search",s={q:t,type:"album",limit:d};$.getJSON(n,s).done(function(a){$(".sort").css("display","flex"),$.each(a.albums.items,function(a,e){if(e.images.length>0){var t={id:e.id,name:e.name,href:e.href,image:e.images[0].url};m.push(t),i(m)}}),$(".covers").removeAttr("data-created"),e(m)})});var h,v;$(".gallery").on("click","div",function(){var e=$(this).attr("data-created");"undefined"!=typeof e&&e!==!1?(v=$(this).attr("data-created"),a(f[v].name_album),s(v),r(v),n(v)):(h=$(this).index(),f=[],a(m[h].name),l(m),s(h),r(h),n(h)),$("#overlay").addClass("open").css("display","flex")}),$("#overlay").click(function(){$("#overlay").removeClass("open"),h=void 0,v=void 0}),$(".left-arrow").click(function(a){a.stopPropagation();var e=$(".gallery").children().length;void 0===v&&h>0?(h-=1,o(h)):void 0===v&&0===h?(h=e-1,o(h)):void 0===h&&v>0?(v-=1,o(v)):void 0===h&&0===v&&(v=e-1,o(v))}),$(".right-arrow").click(function(a){a.stopPropagation();var e=$(".gallery").children().length;void 0===v&&e-2>=h?(h+=1,o(h)):void 0===v&&h===e-1?(h=0,o(h)):void 0===h&&e-1>v?(v=Number(v),v+=1,o(v)):void 0===h&&v===e-1&&(v=0,o(v))}),$(".date").click(function(){$(this).hasClass("active")===!1?($(this).addClass("active"),f=[],l(m),c(),t(f),$(".covers").each(function(a){$(this).attr("data-created",a)})):$(this).hasClass("active")===!0&&($(this).removeClass("active"),f=[],l(m),e(m))})});
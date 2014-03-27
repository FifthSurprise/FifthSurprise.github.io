$(document).ready(function() {
    $(".fancybox").fancybox();
    $('#search').click(function(e) {
        e.preventDefault();
        var query = $('#keyword').val();
        var top = $('hr');
        top.empty();
        var result = $.getJSON("http://api.flickr.com/services/rest/?format=json&method" +
            "=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags=" +
            query + "&jsoncallback=?", function(data) {

                var photo_array = data["photos"]["photo"];
                var imgArray = [];

                //construct each of the url's per photo object and put it into imgarray
                for (var i in photo_array) {
                    imgArray.push(makeUrl(photo_array[i]));
                }
                for (var n in imgArray) {
                    var img = $('<img>').attr({
                        "src": imgArray[n],
                        "height": "400px",
                        "width": "400px"
                    });
                    var href = $('<a>').attr({
                        "class": "fancybox",
                        "href": imgArray[n]
                    });
                    href.fancybox({
                        helpers: {
                            title: {
                                type: 'float'
                            }
                        }
                    });
                    img.appendTo(href);
                    href.appendTo(top);
                }
            });
    });

});

function makeUrl(photoObj) {
    var farmid = photoObj["farm"];
    var serverid = photoObj["server"];
    var secret = photoObj["secret"];
    var id = photoObj["id"];
    var url = "http://farm" + farmid + ".staticflickr.com/" + serverid + "/" + id + "_" + secret + ".jpg";
    return url;
};



//write your solution here...
/*

API url: 

http://www.flickr.com/services/api/request.rest.html

AJAX request URLwith tags=cat (search term = cat):

http://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags=cat&jsoncallback=?

JSON Snippet:

jsonFlickrApi({
    "photos": {
        "page": 1,
        "pages": 46641,
        "perpage": 100,
        "total": "4664056",
        "photo": [
            {
                "id": "7790251192",
                "owner": "80992738@N00",
                "secret": "50b0af1b38",
                "server": "8440",
                "farm": 9,
                "title": "Friends",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            },

info about creating photo url from son data: http://www.flickr.com/services/api/misc.urls.html
{
id: "13432475754",
owner: "34740498@N08",
secret: "7466e9083e",
server: "7388",
farm: 8,
title: "Sandra & Queso",
ispublic: 1,
isfriend: 0,
isfamily: 0
},
http://farm8.staticflickr.com/7388/13432475754_7466e9083e.jpg
http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

Example Test:

http://farm9.staticflickr.com/8440/7790251192_50b0af1b38.jpg

*/
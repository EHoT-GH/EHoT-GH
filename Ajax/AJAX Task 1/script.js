var map;
var lat = 0;
var lon =0;
var a = new Date();
var b = Math.round(a/1000);
var h = 0;
var res = [];
var res2 = [];
var $resdiv = $('.dataweather');
var $resdiv2 = $('.city');
var $prewDay = $('#prew');
var $buttons = $('#hide');
var $nextDay = $('#next');
var arrAddress;
var ct = moment(a).format('l');
var ctc = moment(a).format('H:mm');
var itemLocality;
var nowUnix = b;

check();

$prewDay.click(function() {
  var timeUnix = Math.round(new Date() / 1000);
  nowUnix -= 86400;
  var currentTimeNormal = new Date(nowUnix * 1000);
  var ctn = moment(currentTimeNormal).format('l');
  check();

  getWeather(nowUnix, ctn, ctc);
});


$nextDay.click(function() {
  var timeUnix = Math.round(new Date() / 1000);
  nowUnix += 86400;
  var currentTimeNormal = new Date(nowUnix*1000);
  var ctn = moment(currentTimeNormal).format('l');
  check();
  getWeather(nowUnix, ctn, ctc);
});

function check() {
  if (nowUnix == b) {
    $nextDay.attr("disabled",'');
  } else {
    $nextDay.removeAttr("disabled");
  }
};


function getGeoLoc() {
  var defObj = $.Deferred();

  navigator.geolocation.getCurrentPosition( 
    function(data) {
      defObj.resolve(data);
    },
    function(error) {
      defObj.reject(error);
    });
  return defObj.promise();
}

getGeoLoc().then(function(data) {
  h = 1;
  $buttons.removeClass("hide");
  lat = data.coords.latitude;
  lon = data.coords.longitude;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat, lng: lon},
    zoom: 11
  });
  initialize();
  codeLatLng(lat,lon);
  getWeather(b,ct,ctc);
  var myLatlng = new google.maps.LatLng(lat,lon);
  var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Hello World!"
  });
  marker.setMap(map);

  console.log(lat,lon);
})
.catch( function(err) {
  console.log('ERROR!',err);
  alert('Allow gealocation to see weather.')
});

function getWeather(time,currentTimeNormal,ctc) {
  $.ajax({
    url : 'https://api.darksky.net/forecast/a47c635df85167a5c1942992756bd208/'+lat+','+lon+','+time+'?lang=uk&units=auto',
    dataType: 'jsonp'
  }).done( function(data) {
    console.log(data);
    res = '<br>'+Math.floor(data.currently.temperature)+'\xB0 '+data.currently.summary+'<br>'+currentTimeNormal+' '+ctc+'<br><br>'+data.hourly.summary;
    $resdiv.html(res);
  });
};

function initMap() {}

function initialize() {
  geocoder = new google.maps.Geocoder();

}
function codeLatLng(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lon);
  geocoder.geocode({latLng: latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        arrAddress = results;
        console.log(arrAddress);
        $.each(arrAddress, function(i, address_component) {
          if (address_component.types[0] == "locality") {
            itemLocality = address_component.address_components[0].long_name;
            console.log(itemLocality);
          }
        });
        res2 = '<br>'+arrAddress[2].formatted_address;
        $resdiv2.html(res2);
      } else {
        alert("No results found");
      }
    } else {
      alert("Geocoder failed due to: " + status);
    }
  });
}
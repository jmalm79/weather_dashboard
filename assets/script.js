
var cityToSearch = $("#userInput");
var search = $("#searchBtn");

search.on('click', function(event){
  event.preventDefault();
  var searchVal = cityToSearch.val();


  // the following ajax calls are set to verify API is working correctly
  var fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchVal}&units=imperial&appid=12e6b575a60905e800feeb8afb939696`;
  $.ajax({
    url: fiveDayForecast,
    method: 'GET',
  }).then(function (response) {
    console.log('Ajax Reponse fiveDayForecast \n-------------');
    console.log(response);

});
});


var currentDay = `http://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=12e6b575a60905e800feeb8afb939696`;
$.ajax({
  url: currentDay,
  method: 'GET',
}).then(function (response) {
  console.log('Ajax Reponse CurrentDay \n-------------');
  console.log(response);
});

var today = moment().format('L');
var todayDate = moment().format('L'); 
// global variables
var userInput = $("#userInput");
var searchBtn = $("#searchBtn");
// var history = $("#history");
var searchVal = $();
var lat;
var lon;
var uvIndex = $('#uvIndex') ;
var humidity = $('#humidity');
var windspeed = $('#windspeed');
var temp = $('#temp');
var cityName = $('#cityName'); 
var fiveDay = $('#fiveDay');
var cityBlock = $('#cityBlock');
var histElem =$();

var cityHistory = JSON.parse(localStorage.getItem('cityHistory')) || [];

searchBtn.on('click', function(event){
  event.preventDefault();
  saveSearch();
  makeButton();
  addIndexColor();
});



//the following will call the currentDay api, then will feed lat and lon into oneCall Api. 
function saveSearch(){
  var searchVal = userInput.val();
  
  var currentDay = `http://api.openweathermap.org/data/2.5/weather?q=${searchVal}&units=imperial&appid=12e6b575a60905e800feeb8afb939696`;
    $.ajax({
      url: currentDay,
      method: 'GET',
    }).then(function (response) {
     console.log('Ajax Reponse CurrentDay \n-------------');
     console.log(response);
      //cityName = (response.name);
      lat = (response.coord.lat);
      lon = (response.coord.lon);
      //cityName.text(+ response.name);
      
    
    var oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,daily,alerts&units=imperial&appid=12e6b575a60905e800feeb8afb939696";
      $.ajax({
        url: oneCall,
        method: 'GET',
      }).then(function (response) {
        uvIndex.text("uvIndex: " + response.current.uvi);
        humidity.text("Humidity: " + response.current.humidity);
        windspeed.text("Windspeed: " + response.current.wind_speed);
        temp.text("Temp:"+ response.current.temp.toFixed(0)+"°F" );
        cityName.text(searchVal);
      });
        
    });

  var fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchVal}&units=imperial&appid=12e6b575a60905e800feeb8afb939696`;
    $.ajax({
      url: fiveDayForecast,
      method: 'GET',
    }).then(function (response) {
      console.log('Ajax Reponse fiveDayForecast \n-------------');
      console.log(response);
      fiveDay.text("");
      var newForecast = $('<row>');
      newForecast.addClass('row')
      fiveDay.append(newForecast)

      for(var i = 3; i <response.list.length; i+=8){
        var daysFigure = $('<figure>');
        daysFigure.addClass('days col-sm-2');

        var date = $('<p>');
        var day =moment().add(i/8, 'days').format('l');
        date.text(day);

        var temp = $('<p>');
        temp.text('Temp: '+ response.list[i].main.temp.toFixed(0)+"°F");

        var weatherImage =$('<img>');
        weatherImage.addClass ('weather-icon')
        weatherImage.attr('src','http://openweathermap.org/img/wn/'+ response.list[i].weather[0].icon+'.png');

        var humidity =  $('<p>');
        humidity.text('Humidity: '+ response.list[i].main.humidity+"%");

        
        daysFigure.append(date);
        daysFigure.append(temp);
        daysFigure.append(weatherImage);
        daysFigure.append(humidity);

        newForecast.append(daysFigure);
      }

    });

  cityHistory.push(searchVal);
  localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
}

// this will pull any past searches from local storage, to-do make buttons for any city in search history, and for new searches.



 function makeButton(){
   // Clear last search term
  if (cityHistory.length > 1){
    histElem.remove();
  }

  histElem =$('<div>')
  histElem.addClass('container')
  cityBlock.append(histElem)
  
  cityHistory.forEach(function(box, index){
        
  
  var cityBtn = $('<button>')
  cityBtn.addClass('col-12 btn btn-outline-secondary')
  cityBtn.text(cityHistory[index])
  histElem.append(cityBtn)
  
 });
}
makeButton();


  // if (uvIndex < 3) {
  //   "#uvIndex".addClass('low');
  //  } else if (uvIndex < 6) {
  //   "#uvIndex".addClass('medium');
  // } else if (uvIndex < 8) {
  //   "#uvIndex".addClass('high');
  // } else {
  //   "#uvIndex".addClass('vHigh');
  // };

// The init() function fires when the page is loaded 
// function init() {
//   // When the init function is executed, the code inside renderLastGrade function will also execute
//   makeList();
// }
// init();

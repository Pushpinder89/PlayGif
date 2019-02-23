$(document).ready(function () {
  var gifs = ["laugh", "cry", "angry", "funny", "sad", "love", "surprised", "thumbs up", "wow", "why", "ouch", "oops", "lazy", "stressed"];
  var userInput;
  function displayBtn() {
      $("#gifBtn").empty();
      //create a button when user inputs 
      for (var i = 0; i < gifs.length; i++) {
          var animalGifBtn = $('<button>')
          animalGifBtn.addClass("gifButtonSingle");
          animalGifBtn.addClass("btn btn-success m-1")
          animalGifBtn.attr("data-name", gifs[i]);
          animalGifBtn.text(gifs[i]);
          $("#gifBtn").append(animalGifBtn)
      }
  }
  //and hit add
  function addBtn() {
      $('#addGif').on("click", function (e) {
          e.preventDefault();
          var userInput = $('#animalName-input').val().trim();
          if (userInput !== "") {
              gifs.push(userInput);
              displayBtn();
          }
          else {
              alert("Must enter a valid input to proceed!")
          }

      });
  }
  addBtn()


  function removeBtn() {
      $('#removeGif').on("click", function () {
          gifs.pop(userInput);
          displayBtn()
      })
  }
  removeBtn();

  $(document).on("click", ".gifButtonSingle", displayGifs)
  displayBtn();

  //function to get data and display
  function displayGifs() {
    
      var APIKey = "07TTzNbZeSEcKvkECYViKhzrheC3lT3P";
      var gifs = $(this).attr("data-name");//what does this line do?
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=" + APIKey + "&limit10";

      $.ajax({
          url: queryURL,
          method: "GET"
      }).done(function (response) {
          console.log(response)
          $("#gifsHere").empty()
          var r = response.data

          //loopthrough the data object
          
          for (var i = 0; i < r.length; i++) {
            
              var rating = r[i].rating
              var rate = $('<p class="card-tittle text-center">').text("Rating: " + rating)
              
              //append the gif urls
              var gifImage = $('<img class= "card-img-top col-md-4">')
              gifImage.attr("src", r[i].images.fixed_height_still.url);
              gifImage.attr("data-still", r[i].images.fixed_height_still.url);
              gifImage.attr("data-animate", r[i].images.fixed_height.url);
              gifImage.attr("data-state", "still");
              gifImage.addClass("image");
              $("#gifsHere").prepend(gifImage)
          }
      })
  }

  $(document).on("click", ".image", function () {
      var state = $(this).attr('data-state');
      if (state == 'still') {
          $(this).attr('src', $(this).data('animate'));
          $(this).attr('data-state', 'animate');
      } else {
          $(this).attr('src', $(this).data('still'));
          $(this).attr('data-state', 'still');
      }
  })


});





























// $(document).ready(function() {

//     var fruit = [
//       "Apple", " Orange", "Pear", "Grapes", "Kiwi",
//       "Strawberry", "Blueberry", "Pineapple", "Watermelon", "Cherries"
  
//     ];
  
//     // function to make buttons and add to page
//     function buttons(arrayToUse, classToAdd, areaToAddTo) {
//       $(areaToAddTo).empty();
  
//       for (var i = 0; i < arrayToUse.length; i++) {
//         var a = $("<button>");
//         a.addClass(classToAdd);
//         a.attr("data-type", arrayToUse[i]);
//         a.text(arrayToUse[i]);
//         $(areaToAddTo).append(a);
//       }
  
//     }
  
//     $(document).on("click", ".fruitBtn", function() {
//       $("#fruit").empty();
//       $(".fruit-button").removeClass("active");
//       $(this).addClass("active");
  
//       var type = $(this).attr("data-type");
//       var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=QlXr5mqaILg6AAWFrIDkk9UZ11VhG2IU";
  
//       $.ajax({
//         url: queryURL,
//         method: "GET"
//       })
//         .then(function(response) {
//           var results = response.data;
  
//           for (var i = 0; i < results.length; i++) {
//             var fruitDiv = $("<div class=\"fruit-item\">");
  
//             var rating = results[i].rating;
  
//             var p = $("<p>").text("Rating: " + rating);
  
//             var animated = results[i].images.fixed_height.url;
//             var still = results[i].images.fixed_height_still.url;
  
//             var fruitImage = $("<img>");
//             fruitImage.attr("src", still);
//             fruitImage.attr("data-still", still);
//             fruitImage.attr("data-animate", animated);
//             fruitImage.attr("data-state", "still");
//             fruitImage.addClass("fruit-image");
  
//             fruitDiv.append(p);
//             fruitDiv.append(fruitImage);
  
//             $("#fruit").append(fruitDiv);
//           }
//         });
//     });
  
//     $(document).on("click", ".fruit-image", function() {
  
//       var state = $(this).attr("data-state");
  
//       if (state === "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//       }
//       else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//       }
//     });
  
//     $("#add-fruit").on("click", function(event) {
//       event.preventDefault();
//       var newFruit = $("input").eq(0).val();
  
//       if (newFruit.length > 2) {
//         fruit.push(newFruit);
//       }
  
//       buttons(fruit, "fruitBtn", "#fruitBtns");
  
//     });
  
//     buttons(fruit, "fruitBtn", "#fruitBtns");
//   });
  
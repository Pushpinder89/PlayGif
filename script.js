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

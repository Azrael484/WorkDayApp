
$(window).on("load", function () { //This function will only execute after the entire page is rendered by the browser.

  //Gives the user the current day and time in the specified format.

  setInterval( ()=>{

    var today = dayjs();
    var presentTime = today.format('[Today is] dddd, MMMM D, YYYY [and the current hour is] hh:mm:ss a[.]');
    $('#currentDay').text(presentTime).addClass("text-center");

    if (dayjs().minute()===0&&dayjs().second()==0){ // Will reload the page every hour on the hour.

      location.reload;
    
    };

  }, 1000);

   //Applies color coding scheme to the distinct time blocks depending whether they refer to past, present, or future events.

  function colorCodeHours() {

    var presentHour = dayjs().hour();

    console.log(presentHour);

    var schedHours = $('.time-block'); //array composed of the <div>s that belong to the class ".time-block"

    console.log(schedHours);

/* Looping through each of the elements in the "schedHours" array, applying the anonymous callback function*/
  schedHours.each(function (){

      var schedHourId = $(this).attr("id"); //Get the value of the id attribute of the array element

      console.log(schedHourId);

      var idArray = schedHourId.split("-");//The split() method separates the string into two substrings: "hour" and a string denoting a number between 9 and 17. After that, it returns an array with those two substrings as elements

      console.log(idArray);

      var schedHour = idArray[1]; //We choose the string denoting the number (second element of the array)

      console.log(schedHour);

      if(schedHour > presentHour){ //Use type coercion to evaluate Boolean expression: comparing schedHour with presentHour.

        $(this).addClass("future").removeClass("past present");

      } else if (schedHour < presentHour){

        $(this).addClass("past").removeClass("present future");

      } else {

        $(this).addClass("present").removeClass("past future");

      }
    })
  }

  //Invoking the function

  colorCodeHours(); 

  //Adding event listeners to the buttons, in order for the textarea input to be saved to client-side storage

  $('.saveBtn').on('click', storeTasks); 

  // Declaring the event-handler for all possible clicking events in any of the ".saveBtn" buttons

  function storeTasks(event){

    var element = event.target;

    var timeBlock = $(element).parent().attr('id');

    var tasksToDo = $(element).siblings('.description').val(); //Read the input entered to the text-area by the user

    var savedOrNot = $(element).children();

    savedOrNot.text('Saved');

    localStorage.setItem(timeBlock, tasksToDo);

    console.log(localStorage);


  }

  function displayTasks(){

    $('.time-block').each(function (){

      var timeBlock = $(this).attr('id')

      var displayTasksEl = $(this).children().eq(1);

      console.log(displayTasksEl);

      displayTasksEl.text(localStorage.getItem(timeBlock));

    })
  }


displayTasks();


})



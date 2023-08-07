
$(window).on("load", function () { //This function will only execute after the entire page is rendered by the browser.

  //Gives the user the current day and time in the specified format.

  setInterval( ()=>{

    var today = dayjs();
    var presentTime = today.format('[Today is] dddd, MMMM D, YYYY [and the current hour is] hh:mm:ss a[.]');
    $('#currentDay').text(presentTime).addClass("text-center");

    if (dayjs().minute()===0&&dayjs().second()==0){ // Will reload the page every hour on the hour, so as to re-apply the appropriate colors to the time blocks.

      location.reload;

    }
    if(dayjs().hour()===0){

      localStorage.clear(); //Clears the localStorage at midnight so as to start the day anew.

    }

  }, 1000); //The arrow function is executed every second(=1000ms).

   //Applies color coding scheme to the distinct time blocks depending whether they refer to past("gray"), present("red"), or future("green") events.

  function colorCodeHours() {

    var presentHour = dayjs().hour(); // Stores the actual hour for comparison purposes. See conditional statements below.

    console.log(presentHour);

    var schedHours = $('.time-block'); //Returns an array composed of the <div>s that belong to the class ".time-block"

    console.log(schedHours);

/* Looping through each of the elements in the "schedHours" array, applying the anonymous callback function*/
  schedHours.each(function (){

      var schedHourId = $(this).attr("id"); //Get the value of the id attribute of the array element that is being dealt with in the current iteration of the loop

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

  //Adding event listeners to the buttons with the floppy disc icons, in order for the textarea input to be saved to client-side storage

  $('.saveBtn').on('click', storeTasks); //Hoisting the event-handler.

  // Declaring the event-handler for all possible clicking events in any of the ".saveBtn" buttons

  function storeTasks(event){

    var element = event.target;

    var timeBlock = $(element).parent().attr('id');

    var tasksToDo = $(element).siblings('.description').val(); //Read the input entered to the text-area by the user

    var savedOrNot = $(element).children(); // Stores a reference to the only DOM node that is a descendant of the ".saveBtn" button

    savedOrNot.text('Saved'); //Updates the text content of the <i> selected.

    $(element).addClass("btn-success").removeClass("btn-warning"); //Using Bootstrap utilities, it changes the color of the save button

    localStorage.setItem(timeBlock, tasksToDo); //Writes the input data from the text area into local storage.

    console.log(localStorage);


  }

  // Algorithm for retrieving the data saved on local storage that persists even after reloading/closing the tab

  function displayTasks(){

    $('.time-block').each(function (){ //Loops through all <div>s that belong to the given class.

      var timeBlock = $(this).attr('id') //Gets and stores the "id" attribute of the <div> currently being dealt with

      var displayTasksEl = $(this).children().eq(1); //Stores a reference to the coresponding text-area (where data will be displayed)

      var tasksToDo = localStorage.getItem(timeBlock); // Gets data from client-side storage and stores the string into the variable

      displayTasksEl.text(tasksToDo); //Updates the content of the text area on load, showing whatever tasks/activities where already saved.

    })
  }


displayTasks();//Invoking the function in order to display the tasks scheduled for each working hour.


})



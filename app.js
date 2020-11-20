//getting the button
document.querySelector('.btn').addEventListener('click', showJokes);
//function showJokes();
function showJokes(e) {
  //getting the value inside the input field
  const number = document.querySelector('input[type="number"]').value;
  let invalid_input = document.querySelector('.invalid-input');
  if(number > 0) {
    invalid_input.innerHTML = "";
    //creating object of xhr
    const xhr = new XMLHttpRequest();
    //OPEN - at the end of url we add our inputted number using tick notation, the url is take from "http://www.icndb.com/api/"
    xhr.open('GET',`https://api.icndb.com/jokes/random/${number}`,true);
    //onload
    xhr.onload = function() {
      //checking the status : 200 -okay.
      if(this.status === 200) {
        const response = JSON.parse(this.responseText);
        let output = '';
        //to see what is happening behind the scenes uncomment the following line to see the output on console.
        //actually this api has a property 'type' that is 'success' and a property 'value' that contains an array of objects including 'id' and 'joke'
        //as we only need 'joke' from this api that's why we used item.joke in the function below.
        //every api has different implementation.
        //console.log(this.responseText);
        if(response.type === "success") {
          //now we've to iterate to each value.
          response.value.forEach(function(item) {
            //output = output + ... is because if we only write output = ... then it will over-ride but we want to concatenate the output.
            output += `
            <li>${item.joke}</li>
            `;
          });
        } else {
          output += '<li>Something went wrong!</li>'
        }
        //displaying the jokes
        document.querySelector('.jokes').innerHTML = output;
      }
    }
    //Send
    xhr.send();
  } else {
    invalid_input.innerHTML = "Please enter a number greater than 0";
    invalid_input.style.marginBottom = "10px";
  }
  //preventing the default behavior
  e.preventDefault();
}

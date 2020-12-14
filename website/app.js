/* Global Variables */
// {zip code},{country code}&appid={API key}
const urlLink = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=c649ab0b16f5e209a2f0024deb9d9906&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generateFun);

/* Function called by event listener */
function generateFun(e) {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeather(urlLink,zipCode,apiKey)

  .then(function (data){
    console.log(data);
    postData("/add", {date: newDate, temp: temp, content: feelings});
    updateUI();
  })

}

/* Function to GET Web API Data*/
const getWeather = async(urlLink, zipCode, apiKey) => {
  const res = await fetch(urlLink + zipCode + apiKey);

  try {
    const data = await res.json();
    console.log(data);
  } 
  catch {
    console.log("error", error);
  }
}

/* Function To POST Data */
const postData = async(url = '', data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch(error) {
    console.log("error", error);
  }
}

/* Function to GET Project Data */
const updateUI = async() => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = `Date: ${allData[0].date}`
    document.getElementById("temp").innerHTML = `Temperature: ${allData[0].temp}`
    document.getElementById("content").innerHTML = `I feel: ${allData[0].content}`
  } catch(error) {
    console.log("error", error);
  }
}

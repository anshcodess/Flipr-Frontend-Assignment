const dispaly = document.getElementById("display-data");
const category = document.getElementById("category");
const year = document.getElementById("year");

// Below function is used to Dynamically populate Year in DropDownList
window.onload = function () {
    //Reference the DropDownList.
    var year = document.getElementById("year");

    //Determine the Current Year.
    // var currentYear = (new Date()).getFullYear();

    //Loop and add the Year values to DropDownList.
    for (var i = 2018; i >= 1901; i--) {
        var option = document.createElement("OPTION");
        option.innerHTML = i;
        option.value = i;
        year.appendChild(option);
    }
};

const getData = async () => {
    const res = await fetch("https://api.nobelprize.org/v1/prize.json");
    const data = await res.json();
    return data;
}

const displayWinners = async () => {

    let categoryVal = category.value;
    let yearVal = year.value;

    const payload = await getData();

    let dataDisplayObj = payload.prizes.filter((eventData) => {
        if(eventData.category == categoryVal && eventData.year == yearVal){
            return eventData;
        }
    });

    let dataDisplay = dataDisplayObj[0].laureates.map((object) => {

        return `
        <div class="winnerDetails-container">
            <p>Name: ${object.firstname} ${object.surname}</p>
            <p>Motivation: ${object.motivation}</p>
        </div>
        `

    }).join("");

    dispaly.innerHTML = dataDisplay;

}

const allLaureates = async () => {

    const payload = await getData();

    let dataDisplay = payload.prizes.laureates.map((object) => {

        return `
        <div class="winnerDetails-container">
            <p>Name: ${object.firstname} ${object.surname}</p>
            <p>Motivation: ${object.motivation}</p>
        </div>
        `

    }).join("");

}
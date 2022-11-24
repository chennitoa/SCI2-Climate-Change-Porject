const foodTypeList = ["Beef", "Lamb / Mutton", "Seafood", "Cheese", "Pork", "Fish", "Poultry", "Eggs", "Tofu", "Groundnuts", "Peas", "Nuts", "Grains",
"Milk", "Soy Milk", "Cassava", "Rice", "Wheat Bread", "Oatmeal", "Potatoes", "Tomato", "Onions / Leeks", "Brassicas", "Root Vegetables",
"Berries", "Bananas", "Apples", "Citrus", "Cane Sugar", "Beet Sugar", "Beer", "Wine", "Dark Chocolate", "Coffee"];
const carbonValue = [5.0, 2.0, 1.8, 1.1, 0.76, 0.6, 0.57, 0.42, 0.2, 0.12, 0.04, 0.03, 0.27, 3.2, 1.0, 1.4, 1.2, 0.9, 0.6, 0.6, 2.1, 0.5, 0.5, 0.4, 1.5, 0.9, 0.4, 0.4, 3.2, 1.8, 0.3, 0.2, 2.3, 0.4];

let addItem = document.querySelector("#add-item");
let foodTypes = document.querySelector("#food-types");
let windowMenu = document.getElementById("window");
let foodWindow = document.querySelector(".food-object");
let calculateButton = document.querySelector("#calculate");
let results = document.querySelector("#results");

let numItems = 0; 

foodTypeList.forEach(foodName => {
    let option = document.createElement("option");
    option.innerText = foodName;
    option.setAttribute("value", foodName);
    foodTypes.add(option);

    /*
    //Testing food values:
    let foodIndex = foodTypeList.indexOf(foodName);
    let foodValue = carbonValue[foodIndex];
    console.log(foodIndex + ". Carbon value of " + foodName + " is " + foodValue);
    */
    
})

addItem.addEventListener("click", () => {
    let foodItem = foodTypes.options[foodTypes.selectedIndex].text;
    let foodIndex = foodTypeList.indexOf(foodItem);
    let foodWindowClone = foodWindow.cloneNode(true);
    let foodWindowCloneChildren = foodWindowClone.children;
    let grams = foodWindowClone.children[4];

    foodWindowCloneChildren[0].innerText = foodItem;
    foodWindowCloneChildren[1].setAttribute("for", "mass" + numItems);
    foodWindowCloneChildren[2].setAttribute("id", "mass" + numItems);

    foodWindowCloneChildren[5].addEventListener("click", () => {
        foodWindowClone.remove();
        numItems--;
    });

    if (foodIndex <= 12) {
        foodWindowClone.classList.add("food-type-protein");
        grams.innerText = "(10 grams protein)";
    }
    else if (foodIndex <= 14) {
        foodWindowClone.classList.add("food-type-milk");
        grams.innerText = "(1 liter)";
    }
    else if (foodIndex <= 19) {
        foodWindowClone.classList.add("food-type-starch");
        grams.innerText = "(1000 kilocalories)";
    }
    else if (foodIndex <= 23) {
        foodWindowClone.classList.add("food-type-vegetable");
        grams.innerText = "(1 kilogram)";
    }
    else if (foodIndex <= 27) {
        foodWindowClone.classList.add("food-type-fruit");
        grams.innerText = "(1 kilogram)";
    }
    else {
        foodWindowClone.classList.add("food-type-other");
        if (foodIndex <= 29) grams.innerText = "(1 kilogram)";
        else if (foodIndex <= 31) grams.innerText = "(10 mililiters alcohol)";
        else if (foodIndex == 32) grams.innerText = "(50 grams)";
        else grams.innerText = "(1 cup)";
    }
    numItems++;
    windowMenu.appendChild(foodWindowClone);
});

let hasBeef = false;
let amountBeef = 0;

calculateButton.addEventListener("click", () => {
    let total = 0;  
    amountBeef = 0;
    for (foodListItem of windowMenu.children) {
        if (foodListItem.tagName != "HR") {
            let index = foodTypeList.indexOf(foodListItem.children[0].innerText);
            if (index == 0) {
                hasBeef = true;
                amountBeef += foodListItem.children[2].value;
            }
            total += carbonValue[index] * foodListItem.children[2].value;
        }
    };
    //Result Carbon
    let resultCarbon = document.querySelector("#result-carbon");
    resultCarbon.children[3].innerText = total.toFixed(2);

    //Result Everyone
    let resultEveryone = document.querySelector("#result-everyone");
    let everyonePercent = document.querySelector("#everyone-percent");
    const emissions = 5981;
    const people = 331.9;
    let differencePerPerson = total - 2.5;
    let percent = (((differencePerPerson * people * 365) / 1000) + emissions) / emissions;
    percent *= 100.0;
    let finalPercent = 0;
    if (percent > 100.0) {
        everyonePercent.innerText = "increase";
        finalPercent = (percent - 100.0); 
    }
    else {
        everyonePercent.innerText = "decrease";
        finalPercent = (100 - percent);
    }
    resultEveryone.children[2].innerText = finalPercent.toFixed(2) + "%";

    //Result Cars
    let resultCars = document.querySelector("#result-cars");
    resultCars.children[3].innerText = (total * 365 / 5500).toFixed(2);

    //Result Cars Everyone
    let resultCarsEveryone = document.querySelector("#result-cars-global");
    let carsGlobalAmount1 = document.querySelector("#cars-global-amount1");
    let carsGlobalAmount2 = document.querySelector("#cars-global-amount2");
    let numCarsEveryone = ((percent / 100) * emissions - emissions) / 5.5;
    if (numCarsEveryone > 0) {
        carsGlobalAmount1.innerText = "putting";
        carsGlobalAmount2.innerText = "new passenger cars on";
    }
    else {
        carsGlobalAmount1.innerText = "taking";
        carsGlobalAmount2.innerText = "passenger cars off";
    }
    resultCarsEveryone.children[2].innerText = Math.abs(numCarsEveryone).toFixed(2);

    results.style.display = "block";
    resultCarbon.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

    let replaceBeef = document.querySelector("#replace-beef");
    replaceBeef.style.display = "none";

    if (hasBeef && amountBeef > 0.2) displayBeef();
});

function displayBeef() {
    hasBeef = false;
    let replaceBeef = document.querySelector("#replace-beef");

    let beefCO2 = document.querySelector("#beef-co2");
    let beefWater = document.querySelector("#beef-water");
    let beefEnergy = document.querySelector("#beef-energy");
    let beefNitro = document.querySelector("#beef-nitro");

    let conversionValue = 23.3 / carbonValue[0];
    
    beefCO2.innerText = (amountBeef * carbonValue[0]).toFixed(2);
    beefWater.innerText = (amountBeef * conversionValue * 51.8).toFixed(2);
    beefEnergy.innerText = (amountBeef * conversionValue * 2095).toFixed(2);
    beefNitro.innerText = (amountBeef * conversionValue * 161).toFixed(2);

    let porkCost = document.querySelector("#pork-cost");
    let chickenCost = document.querySelector("#chicken-cost");
    let muttonCost = document.querySelector("#mutton-cost");

    porkCost.innerText = (amountBeef * carbonValue[4]).toFixed(2);
    chickenCost.innerText = (amountBeef * carbonValue[6]).toFixed(2);
    muttonCost.innerText = (amountBeef * carbonValue[1]).toFixed(2);

    replaceBeef.style.display = "block";
}
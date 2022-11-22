const foodTypeList = ["Beef", "Lamb / Mutton", "Seafood", "Cheese", "Pork", "Fish", "Poultry", "Eggs", "Tofu", "Groundnuts", "Peas", "Nuts", "Grains",
"Milk", "Soy Milk", "Cassava", "Rice", "Wheat Bread", "Oatmeal", "Potatoes", "Tomato", "Onions / Leeks", "Brassicas", "Root Vegetables",
"Berries", "Bananas", "Apples", "Citrus", "Cane Sugar", "Beet Sugar", "Beer", "Wine", "Dark Chocolate", "Coffee"];
const carbonValue = [50.0, 20.0, 18.0, 11.0, 7.6, 6.0, 5.7, 4.2, 2.0, 1.2, 0.4, 0.3, 2.7, 3.2, 1.0, 1.4, 1.2, 0.9, 0.6, 0.6, 2.1, 0.5, 0.5, 0.4, 1.5, 0.9, 0.4, 0.4, 3.2, 1.8, 0.3, 0.2, 2.3, 0.4];

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
    foodWindowCloneChildren[0].innerText = foodItem;
    foodWindowCloneChildren[1].setAttribute("for", "mass" + numItems);
    foodWindowCloneChildren[2].setAttribute("id", "mass" + numItems);
    foodWindowCloneChildren[4].addEventListener("click", () => {
        foodWindowClone.remove();
        numItems--;
    });
    if (foodIndex <= 12) {
        foodWindowClone.classList.add("food-type-protein");
    }
    else if (foodIndex <= 14) {
        foodWindowClone.classList.add("food-type-milk");
    }
    else if (foodIndex <= 19) {
        foodWindowClone.classList.add("food-type-starch");
    }
    else if (foodIndex <= 23) {
        foodWindowClone.classList.add("food-type-vegetable");
    }
    else if (foodIndex <= 27) {
        foodWindowClone.classList.add("food-type-fruit");
    }
    else {
        foodWindowClone.classList.add("food-type-other");
    }
    numItems++;
    windowMenu.appendChild(foodWindowClone);
});

calculateButton.addEventListener("click", () => {
    let total = 0;
    console.log(windowMenu.children);
    for (foodListItem of windowMenu.children) {
        if (foodListItem.tagName != "HR") {
            console.log("Checking " + foodListItem + " " + foodListItem.tagName);
            let index = foodTypeList.indexOf(foodListItem.children[0].innerText);
            total += carbonValue[index] * foodListItem.children[2].value / 100.0;
        }
    };
    let resultCarbon = document.querySelector("#result-carbon");
    resultCarbon.children[3].innerText = total.toFixed(2);

    results.style.display = "block";
    resultCarbon.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
});
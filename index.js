const foodTypeList = ["Beef", "Lamb / Mutton", "Seafood", "Cheese", "Pork", "Fish", "Poultry", "Eggs", "Tofu", "Groundnuts", "Peas", "Nuts", "Grains",
"Milk", "Soy Milk", "Cassava", "Rice", "Wheat Bread", "Oatmeal", "Potatoes", "Tomato", "Onions / Leeks", "Brassicas", "Root Vegetables",
"Berries", "Bananas", "Apples", "Citrus", "Cane Sugar", "Beet Sugar", "Beer", "Wine", "Dark Chocolate", "Coffee"];
const carbonValue = [50.0, 20.0, 18.0, 11.0, 7.6, 6.0, 5.7, 4.2, 2.0, 1.2, 0.4, 0.3, 2.7, 3.2, 1.0, 1.4, 1.2, 0.9, 0.6, 0.6, 2.1, 0.5, 0.5, 0.4, 1.5, 0.9, 0.4, 0.4, 3.2, 1.8, 0.3, 0.2, 2.3, 0.4];

let addItem = document.querySelector("#add-item");
let foodTypes = document.querySelector("#food-types");
let windowMenu = document.getElementById("window");
let foodWindow = document.querySelector(".food-object");
let calculateButton = document.querySelector("#calculate");

console.log(foodWindow);
console.log(addItem);

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
    console.log("Carbon value of " + foodName + " is " + foodValue);
    */
})

addItem.addEventListener("click", () => {
    let foodItem = foodTypes.options[foodTypes.selectedIndex].text;
    console.log("Item added: " + foodItem);
    console.log(foodWindow);
    let foodWindowClone = foodWindow.cloneNode(true);
    let foodWindowCloneChildren = foodWindowClone.children;
    foodWindowCloneChildren[0].innerText = foodItem;
    foodWindowCloneChildren[1].setAttribute("for", "mass" + numItems);
    foodWindowCloneChildren[2].setAttribute("id", "mass" + numItems);
    foodWindowCloneChildren[4].addEventListener("click", () => {
        foodWindowClone.remove();
        numItems--;
    });
    numItems++;
    windowMenu.appendChild(foodWindowClone);
});

calculateButton.addEventListener("click", () => {
    let total = 0;
    console.log(windowMenu.children);
    for (foodItem of windowMenu.children) {
        let index = foodTypeList.indexOf(foodItem.children[0].innerText);
        total += carbonValue[index] * foodItem.children[2].value / 100.0;
    };
    console.log(total);
    let result = document.createElement("div");
    result.classList.add("body-text");
    result.innerText = "Your carbon total is the equivalent of: " + total + " kilograms of carbon dioxide";
    document.body.appendChild(result);
});
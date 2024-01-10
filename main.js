class Product{
    Id;
    Category;
    Height;
    FootSize;
    constructor(id, category, height, footSize){
        this.Id=id;
        this.Category=category;
        this.Height=height;
        this.FootSize=footSize;
    }
}

class UserParameters{
    Height;
    FootSize;
    constructor(height, footSize){
        this.Height=height;
        this.FootSize=footSize;
    }
}

let userList;
let products=new Array(10);

products[0]=new Product('1', 'shoes', '0', '36');
products[1]=new Product('2', 'shoes', '0', '37');
products[2]=new Product('3', 'shoes', '0', '37');
products[3]=new Product('4', 'shoes', '0', '37');
products[4]=new Product('5', 'shoes', '0', '36');
products[5]=new Product('6', 'shoes', '0', '36');
products[6]=new Product('7', 'clothes', '185', '0');
products[7]=new Product('8', 'clothes', '180', '0');
products[8]=new Product('9', 'clothes', '190', '0');
products[9]=new Product('10', 'clothes', '175', '0');

document.querySelector('.button_save').addEventListener('click', ()=>{
    let userParams = {
        height: document.querySelector('#height').value,
        footSize: document.querySelector('#foot_size').value
    }
    localStorage.setItem('userParams', JSON.stringify(userParams));
})
document.querySelector('.button_reset').addEventListener('click', ()=>{
    localStorage.clear();
    ShowGrid();
})
document.querySelector('.search_form_button').addEventListener('click', (e)=>{
    e.preventDefault();
    let inputedId = document.querySelector('.search_form_text').value;
    userList = [];
    for(let i = 0; i < 10; i++){
        if (products[i].Id == inputedId){
            userList.push(products[i]);
        }
    }
    ShowGrid(userList);
})

let userParameters;
let path = "images/";
let gridList = document.getElementById('grid_list');
let storedUserJSON = localStorage.getItem('userParams');
if(storedUserJSON != null){
    storedUser = JSON.parse(storedUserJSON);
    userList = [];
    for(let i = 0; i < 10; i++){
        if (products[i].Category == "clothes" && products[i].Height == storedUser.height){
            userList.push(products[i]);
        }
        if (products[i].Category == "shoes" && products[i].FootSize == storedUser.footSize){
            userList.push(products[i]);
        }
    }
    ShowGrid(userList);
}
else{
    ShowGrid();
}

function ClearGrid(){
    while (gridList.firstChild) {
        gridList.removeChild(gridList.firstChild);
    }
}

function ShowGrid(usList){
    ClearGrid();
    if (usList == null){
        userList = [];
        for(let i = 0; i < 10; i++){
            userList.push(products[i]);
        }
    }
    else{
        userList = usList;
    }
    for(let i=0; i < userList.length; i++){
        let li = document.createElement("li");
        li.className = "grid_item";
        li.style.display = "flex";
        li.style.flexDirection = "column";
        li.style.border = "3px solid black";
        const img = document.createElement("img");
        img.src = path+(userList[i].Id)+".jpg";
        const p = document.createElement("p");
        p.textContent =userList[i].Category+" " + userList[i].FootSize +" "+ userList[i].Height ;
        li.appendChild(img);
        li.appendChild(p);
        gridList.appendChild(li);
    }
}
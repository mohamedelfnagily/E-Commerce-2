// Importing my main classes into the main scripting page
import { Product } from "./products.js";
// import { Storage } from "./storage.js";
import { Display,Storage } from "./display.js";
let myProduct = new Product();
let displayProducts = new Display();
let myStorage = new Storage();
//deleting elements from the cart



//Controlling showing and removing the cart 
var cartBtn = document.getElementById("cartTogglingBtn");
var closeCartBtn = document.querySelector(".closeCart");
cartBtn.addEventListener("click",function()
{
    document.getElementById("productsCart").classList.add("myCart");
    document.getElementById("productsCart").classList.remove("d-none");
})
closeCartBtn.addEventListener("click",function()
{
    document.getElementById("productsCart").classList.remove("myCart");
    document.getElementById("productsCart").classList.add("d-none");
    document.querySelector(".bullet").innerHTML = localStorage.getItem('productsCount').toString();
})


//controlling the scrolling of the main banner image background
var stringCollectionArr = ["Furniture collection" , "Women's wear" , "Men's Wear","Technology Needs"];
var imageUrlsCollectionArr = ["../Images/mainHome1.jpg", "../Images/mainHome2.jpg","../Images/mainHome3.jpg","../Images/mainHome4.jpg"];
var bannerSectionElement = document.querySelector(".bannerSection");
var stringCollectionCounter = 0;
var timeCounter = 0;
var imageInterval = setInterval(function(){
    if(stringCollectionCounter==stringCollectionArr.length)
    {
        stringCollectionCounter=0;
    }
    document.querySelector(".bannerSection .bannerCont h1").innerHTML = stringCollectionArr[stringCollectionCounter];
    bannerSectionElement.style.backgroundImage = `URL(${imageUrlsCollectionArr[stringCollectionCounter]})`;
    stringCollectionCounter++;
},1500)

document.body.addEventListener("click",function(){clearInterval(imageInterval)});
//Main logic in our products page:

document.addEventListener("DOMContentLoaded",()=>{

    myProduct.getProducts().then((data)=>displayProducts.displayingProducts(data)).then(()=>{
        let index = 0;
        document.querySelectorAll(".productCard").forEach((item,ind)=>{item.addEventListener("click",function(){displayProducts.viewProductDetails(ind);})});
    });
    myStorage.setProductsNumber();
    displayProducts.addToCartWithFirstLoad();
    let deleteBtns = document.querySelectorAll(".delete");
    for(let i=0;i<deleteBtns.length;i++)
    {
        deleteBtns[i].addEventListener("click",function(event){
            
            let myElem = event.target.parentNode.previousElementSibling.previousElementSibling.firstElementChild.innerHTML;
            console.log(myElem)
            myStorage.deleteAllOfThisProduct(myElem);
            let elem = document.querySelector(".bullet");
            elem.innerHTML = localStorage.getItem('productsCount');
            let elemToDelete = event.target.parentElement.parentElement;
                document.getElementById("productsCart").removeChild(elemToDelete);
            // document.querySelector('.bullet').innerHTML = (localStorage.getItem('productsCount')).toString();
            
        })
    }
});


//adding a product to the cart
document.querySelector(".displayProductBtn").addEventListener("click",displayProducts.addToCart);

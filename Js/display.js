import { Storage } from './storage.js'
class Display {
    //controlling the displaying of products in the main page
    displayingProducts(products = []) {
        let result = "";
        let counter = 1;
        products.forEach((item, index) => {
            result += `<div class="col-md-6">
            <div  class="productCard">
                <div class="prodImgCont">
                <div class="imgHover"></div>
                    <img id="image${index}" class="img-fluid" src="http://127.0.0.1:5500/Images/product-${counter}.jpeg" alt="">
                    <div class="productToCart">
                        <div class="d-flex align-items-center justify-content-center">
                            <i class="fa-solid fa-cart-plus"></i>
                            <p class="p-0 m-0 fw-bolder">ADD TO CART</p>
                        </div>
                    </div>
                    <div class="viewProduct">
                    <div class="d-flex align-items-center justify-content-center">
                        <p class="p-0 m-0 fw-bolder">VIEW PRODUCT</p>
                    </div>
                </div>
                </div>
                <h5 id="text${index}">${item.title}</h5>
                <h6 id="paragraph${index}">${item.price}$</h6>
            </div>
        </div>`
            counter++;
        })
        document.querySelector(".productSection .container-fluid .row").innerHTML = result;

    }
    //view the product when the person click
    viewProductDetails(index) {
        var imgSrc = document.getElementById(`image${index}`).getAttribute("src");
        var headingText = document.getElementById(`text${index}`).innerHTML;
        var paragraphText = document.getElementById(`paragraph${index}`).innerHTML;
        document.querySelector(".displayProductContText h3").innerHTML = headingText;
        document.querySelector(".displayProductContText h6").innerHTML = paragraphText;
        document.querySelector(".displayProductCont img").setAttribute('src', imgSrc);
        document.querySelector(".displayProductOverAll").classList.add("d-flex");
        document.querySelector(".displayProductOverAll").classList.remove("d-none");
        document.querySelector(".displayProductOverAll .closing").addEventListener("click", function () {
            document.querySelector(".displayProductOverAll").classList.remove("d-flex");
            document.querySelector(".displayProductOverAll").classList.add("d-none");
        })
    }
    //Adding a product to the cart
    addToCart() {
        var st = new Storage();
        st.storeProductsInCart();
        let productsInCart = parseInt(document.querySelector(".bullet").innerHTML);
        productsInCart++;
        document.querySelector(".bullet").innerHTML = productsInCart.toString();
        document.querySelector(".displayProductOverAll").classList.remove("d-flex");
        document.querySelector(".displayProductOverAll").classList.add("d-none");
        //get products in cart
        let products = document.getElementById("productsCart").innerHTML;
        let imgSrc = document.querySelector(".displayProductCont img").getAttribute("src");
        let headingText = document.querySelector(".displayProductContText h3").innerHTML;
        let paragraphText = document.querySelector(".displayProductContText h6").innerHTML;
        var flag = st.storeProduct(imgSrc, headingText, paragraphText);
        //product Data
        let id = headingText.replace(/\s/g, '');
        let myElement = document.getElementById(`${id}`);
        if(flag)
        {
            products += `
            <div class="singleItemInCart">
                <img id="${headingText}" class="img-fluid" src="${imgSrc}" alt="">
                <div>
                    <p class="fw-bolder">${headingText}</p>
                    <p class="fw-bold">${paragraphText}$</p>
                </div>
                <div class="d-flex flex-wrap justify-content-center text-center align-items-center">
                    <i class="fa-solid fa-angle-up w-100 fa-2x"></i>
                    <h5 id="${id}" class="w-100 p-0 m-0 fw-bolder">1</h5>
                    <i class="fa-solid fa-angle-down w-100 fa-2x"></i>
                </div>
                <div  class="delete"><i class="fa-regular fa-trash-can fa-2x"></i></div>
            </div>`
        }
        else{
            setTimeout(() => {
                            
            // let myElement = document.getElementById(`${id}`);
            console.log(myElement.innerHTML)
            // console.log(id);
            let newNum = parseInt(myElement.innerHTML)
            let num = newNum+1;
            console.log(num)
            document.getElementById(`${id}`).innerHTML=`${num}`;
            console.log(myElement.innerHTML.toString())
            }, 200);
        }
        document.getElementById("productsCart").innerHTML = products;
        document.querySelector(".closeCart").addEventListener("click", function () {
            document.getElementById("productsCart").classList.remove("myCart");
            document.getElementById("productsCart").classList.add("d-none");
            console.log("helloo")
        })
        let deleteBtns = document.querySelectorAll(".delete");
        for(let i=0;i<deleteBtns.length;i++)
        {
            deleteBtns[i].addEventListener("click",function(event){
                
                let myElem = event.target.parentNode.previousElementSibling.previousElementSibling.firstElementChild.innerHTML;
                console.log(myElem)
                st.deleteAllOfThisProduct(myElem);
                let elem = document.querySelector(".bullet");
                elem.innerHTML = localStorage.getItem('productsCount').toString();;
                let elemToDelete = event.target.parentElement.parentElement;
                document.getElementById("productsCart").removeChild(elemToDelete);
                // document.removeChild(elemToDelete);
            })
        }
        
    }

    //adding all stored data in the cart to be saved after reloading
    addToCartWithFirstLoad() {
        let myStorage = new Storage();
        let myProducts = myStorage.getAllProductsInStorage();

        let products = "";
        if (myProducts.length != 0) {
            //get products in cart
            for (let i = 0; i < myProducts.length; i++) {
                
                let headingText = myProducts[i]['title'];
                let id = headingText.replace(/\s/g, '');
                products += `
                <div class="singleItemInCart">
                    <img class="img-fluid" src="${myProducts[i]['image']}" alt="">
                    <div>
                        <p class="fw-bolder">${myProducts[i]['title']}</p>
                        <p class="fw-bold">${myProducts[i]['price']}$</p>
                        
                    </div>
                    <div class="d-flex flex-wrap justify-content-center text-center align-items-center">
                        <i class="fa-solid fa-angle-up w-100 fa-2x"></i>
                        <h5 id="${id}" class="w-100 p-0 m-0 fw-bolder">${myProducts[i]['counter']}</h5>
                        <i class="fa-solid fa-angle-down w-100 fa-2x"></i>
                    </div>
                    <div class="delete"><i class="fa-regular fa-trash-can fa-2x"></i></div>
                </div>`
            }
            document.getElementById("productsCart").innerHTML += products;
            
            document.querySelector(".closeCart").addEventListener("click", function () {
                document.getElementById("productsCart").classList.remove("myCart");
                document.getElementById("productsCart").classList.add("d-none");
                
            })
        }
    }
}

export { Display, Storage };




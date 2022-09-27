class Storage{
    storeProductsInCart()
    {
        let productsCount = localStorage.getItem('productsCount');
        if(productsCount!==NaN)
        {
            productsCount++;
            localStorage.setItem('productsCount',productsCount.toString())
        }
        else{
            localStorage.setItem('productsCount',"1")
        }
    }

    setProductsNumber()
    {
        if(localStorage.getItem('productsCount'))
        {
            document.querySelector(".bullet").innerHTML = localStorage.getItem('productsCount').toString();
        }
        else{
            document.querySelector(".bullet").innerHTML = "0";
        }
    }

    storeProduct(imgPAth,prodTitle,prodPrice,count=1)
    {
        let productData = {
            image:imgPAth,
            title:prodTitle,
            price:prodPrice,
            counter:count
        }
        let flag = true;
        if(localStorage.getItem('myProducts'))
        {
            let myStoredProducts = JSON.parse(localStorage.getItem('myProducts'));
            
            for(let i=0;i<myStoredProducts.length;i++)
            {
                if(myStoredProducts[i]['title']==prodTitle)
                {
                    myStoredProducts[i]['counter']++;
                    flag=false;
                }
            }
            if(flag)
            {
                myStoredProducts.push(productData);
                localStorage.setItem('myProducts',JSON.stringify(myStoredProducts));
            }
            else{
                localStorage.setItem('myProducts',JSON.stringify(myStoredProducts));
            }
            
        }
        else{
            let myStoredProductsArr=[productData]
            localStorage.setItem('myProducts',JSON.stringify(myStoredProductsArr));
        }
        return flag;
    }

    getAllProductsInStorage()
    {
        if(localStorage.getItem('myProducts'))
        {
            let myStoredProducts = JSON.parse(localStorage.getItem('myProducts'));
            return myStoredProducts;
        }
        else{
            return [];
        }
    }

    deleteAllOfThisProduct(name)
    {
        let prods = JSON.parse(localStorage.getItem('myProducts'));
        
        for(let i=0;i<prods.length;i++)
        {
            if(prods[i]['title']==name)
            {
                let totalProds =parseInt(localStorage.getItem('productsCount'));

                if(totalProds>0)
                {
                    totalProds = totalProds- parseInt(prods[i]['counter']);
                    localStorage.setItem('productsCount',totalProds);
                }
                prods.splice(i,1);
            }
        }
        localStorage.setItem('myProducts',JSON.stringify(prods));
        
    }

}
export{Storage};
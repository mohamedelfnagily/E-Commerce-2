class Product{

   async getProducts()
    {
        try{
            let result = await fetch('../products.json');
            let data = await result.json();
            //accessing the array of objects from the fetch return
            let products = data.items;
            //destructuring into a simple format
            products = products.map(item=>{
                const {title,price}=item.fields;
                const {id}=item.sys;
                const {image}=item;
                return {title,price,id,image}
            })
            return products;
        }
        catch(error)
        {
            console.log(error);
        }
    }
    
}

export{Product};
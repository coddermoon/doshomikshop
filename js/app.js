// dependencies

const cetagoryArr = []




// function






// functions 

const loadData = async ()=>{
   const res= await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    

    return data

}

// menu dyanamicly load

const showMenu =  ()=>{
     for(const cetagory of cetagoryArr ){
     
     const menu = document.getElementById("menu")
     const div = document.createElement('div')
     div.innerHTML = ` <button type="button"  class="btn btn-primary m-2 ">${cetagory}</button>`;
     menu.appendChild(div)
 
     }

}

// show modal

const showModal = (description)=>{
  const modal = document.getElementById('modal')
  modal.innerHTML= ''
   const div = document.createElement('div');
   div.innerHTML = `
   <div class="modal-content">
   <div class="modal-header">
     <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
   </div>
   <div class="modal-body">
   <p>description : ${description}</p>
   </div>
   <div class="modal-footer">
     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
     <button type="button" class="btn btn-primary">Save changes</button>
   </div>
 </div>


   `
   modal.appendChild(div)
}

const ProcessData = async ()=>{
    const products = await loadData()

    
      const  sliceProduct = products.slice(0,9) 
      
    
    
      sliceProduct.forEach(product => {
      
        
        const {title, price,category,image,description,rating}= product

        const {count} = rating

        
          
       

        // cetagory push

        if (cetagoryArr.indexOf(category)=== -1) {

            cetagoryArr.push(category)
          
            
        }

        const card = document.createElement('div')
        
        card.innerHTML= `<div class="col ">
      
        <div class="card border-muted p-4 position-relative">
        
            <div class="collection-img   w-100 d-flex justify-content-center align-items-center">
                <img style=" height: 300px" src="${image}" class="img-fluid img-tumb" alt="">

            </div>
           

            <div class="text-start">
                <p class="category text-muted mb-0"><small>${category}</small></p>
                <p class="text-capitalize my-1 product-tile fw-bold">${title.length > 20 ? title.slice(0,35) + '...' : title}</p>
                <div class="rating mt-0">
                    <span class="text-primary"><i class="fas fa-star star" aria-hidden="true"></i></span>
                    <span class="text-primary"><i class="fas fa-star star" aria-hidden="true"></i></span>
                    <span class="text-primary"><i class="fas fa-star star" aria-hidden="true"></i></span>
                    <span class="text-muted"><i class="fas fa-star star" aria-hidden="true"></i></span>
                    <span class="text-muted"><i class="fas fa-star star" aria-hidden="true"></i></span>
                    <span class="text-danger fw-bold">(${count})</span>
                </div>
                <div class="price-buy d-flex justify-content-between align-items-center mt-3 h-25">
                    <h2 class="price-tag text-primary fw-bold m-0">${price} $</h2>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary fw-bold" onclick="showModal('${description}')">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
        
      `
      document.getElementById('products').appendChild(card)
        
    });
    showMenu()
}



ProcessData()

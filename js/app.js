// dependencies

const arr = [];

const cetagoryArr = []
let count = 0

const cart = document.getElementById('cart')
cart.addEventListener('click',() =>{
  document.getElementById('cartMenu').classList.toggle('d-none')
})


// function
const countCart= (event) =>{

  

  count++
  const produCt = event.target.parentNode.parentNode.children[1].innerText
  const price = event.target.parentNode.parentNode.children[3].children[0].children[0].innerText
console.log(price)


  const tbody = document.getElementById('tbody')
  console.log(tbody)
  const tr =  document.createElement('tr')
  tr.innerHTML = `
  <th scope="row">${count}</th>
  <td>${produCt.length>10? produCt.slice(0,10): produCt}</td>
  <td>${price}</td>
  `
const newProduct = {
  produCt,
  price
}
arr.push(newProduct)
console.log(arr)

tbody.appendChild(tr)


  
 



const cartValue= document.getElementById('shopping-cart')
cartValue.innerText=count
showMassage('successfully added', 'added')

}





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
        

        const {count,rate} = rating

        
          
       

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
                <p class="text-capitalize my-1 product-tile fw-bold">${title.length > 35 ? title.slice(0,35) + '...' : title}</p>
                <div class="rating mt-0 d-flex justify-content-between">
                   <div>
                   <span class="text-primary"><i class="fas fa-star star" aria-hidden="true"></i></span>
                   <span class="text-primary"><i class="fas fa-star star" aria-hidden="true"></i></span>
                   <span class="text-primary"><i class="fas fa-star star" aria-hidden="true"></i></span>
                   <span class="text-muted"><i class="fas fa-star star" aria-hidden="true"></i></span>
                   <span class="text-muted"><i class="fas fa-star star" aria-hidden="true"></i></span>
                   </div>
                   <div> <span class="text-danger fw-bold"> Rating:${rate} (${count})</span></div>
                </div>
                <div class="price-buy d-flex justify-content-between align-items-center mt-3 h-25">
                    <h2 class="price-tag text-primary fw-bold m-0"><span>${price}</span> $</h2>
                 
                </div>
                <div class="d-flex justify-content-between my-3">
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary fw-bold" onclick="showModal('${description}')">details</button>
                <button type="button" class="btn fw-bold btn-primary" onclick="countCart(event)">Add to Cart</button>
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


// massage
const showMassage = (text, status) => {
  const div = document.createElement('div');

  div.className = `toast-message toast-message-slide-in bg-${status}`;
  div.innerText = text;
  document.body.appendChild(div)


  setTimeout(() => {
    div.classList.remove('toast-message-slide-in');
    div.classList.add('toast-message-slide-out');
     
  }, 2000)

  setTimeout(() => {
    div.remove();
     
  }, 2400)

  
}

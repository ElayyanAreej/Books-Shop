'use strict';
//access form to add event listener
let bookShopForm=document.getElementById('bookShopForm');
bookShopForm.addEventListener('submit',addBoook);


// access table Container to render it
let tableContainer=document.getElementById('tableContainer');
let bookTable=document.createElement('table');

tableContainer.appendChild(bookTable);





//my obj
let books=[];
function Book(bookName,bookPrice){
  this.bookName=bookName;
  this.bookPrice=bookPrice;
  this.bookPages=generateRandomPages();
  books.push(this);
}


// access total Price Container to render the total
let totalPriceContainer=document.getElementById('totalPriceContainer');
let totalPricePEL=document.createElement('p');
totalPricePEL.textContent=`Total: ${totalPrice()}`; 
totalPriceContainer.appendChild(totalPricePEL);
  




function generateRandomPages(){
  return Math.floor(Math.random() * (500 - 1) + 1);
}

// Add obj And save it to lcalStorage
function addBoook(event){
  event.preventDefault();
  let bookName=event.target.bookName.value;
  let bookPrice=event.target.bookPrice.value;
  console.log(bookPrice);

  let b1=new Book(bookName,bookPrice);
  b1.renderTableContent();
  console.log(books);
  localStorage.setItem('books',JSON.stringify(books));
}


function renderTableHead(){
  let firstRow=document.createElement('tr');
  let thEl1=document.createElement('th');
  let thEl2=document.createElement('th');
  let thEl3=document.createElement('th');

  thEl1.textContent='Book Name';
  thEl2.textContent='Book pages';
  thEl3.textContent='Book Price';

  firstRow.appendChild(thEl1);
  firstRow.appendChild(thEl2);
  firstRow.appendChild(thEl3);
  bookTable.appendChild(firstRow);


}
renderTableHead();

//render the books inside the array of obj's to the table
Book.prototype.renderTableContent=function(){
  let trEl=document.createElement('tr');
  let tdEl1=document.createElement('td');
  let tdEl2=document.createElement('td');
  let tdEl3=document.createElement('td');

  tdEl1.textContent=this.bookName;
  tdEl2.textContent=this.bookPages;
  tdEl3.textContent=this.bookPrice;

  trEl.appendChild(tdEl1);
  trEl.appendChild(tdEl2);
  trEl.appendChild(tdEl3);
  bookTable.appendChild(trEl);

  totalPricePEL.textContent=`Total: ${totalPrice()}`
  totalPriceContainer.appendChild(totalPricePEL);
};

function loadFromLocalStorge(){
  if(localStorage.getItem('books')){
    let normalObj=JSON.parse(localStorage.getItem('books'));
    books=normalObj;
    for(let i=0;i<books.length;i++){
      let trEl=document.createElement('tr');
      let tdEl1=document.createElement('td');
      let tdEl2=document.createElement('td');
      let tdEl3=document.createElement('td');

      tdEl1.textContent=books[i].bookName;
      tdEl2.textContent=books[i].bookPages;
      tdEl3.textContent=books[i].bookPrice;

      trEl.appendChild(tdEl1);
      trEl.appendChild(tdEl2);
      trEl.appendChild(tdEl3);
      bookTable.appendChild(trEl);
    }
    totalPricePEL.textContent=`Total: ${totalPrice()}`; 
    totalPriceContainer.appendChild(totalPricePEL);
  }
}
loadFromLocalStorge();

function totalPrice(){
  let total=0;
  for(let i=0;i<books.length;i++){
    total=total + Number(books[i].bookPrice);
  }
  return total;
}

const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButon");
const divContainer = document.getElementById("divContainer");


const printProducts = async () => {
  const { data } = await axios.get(`http://localhost:3000/products`)
  data.forEach(productObj => {
    let productContainer = document.createElement('div')
    productContainer.className = "productContainer"
    let productDiv = `
    <div class= "productText">${productObj.product}</div>
    <button class="remove-button"> remove </button>
    <button class="edit-button"> edit </button>`
    productContainer.innerHTML = productDiv;
    divContainer.appendChild(productContainer);
  });
}

printProducts();





const addProduct = async (productString) => {
  try {
    await axios.post(`http://localhost:3000/products`, {
      product: productString
    });
    let productContainer = document.createElement('div')
    productContainer.className = "productContainer"
    let productDiv = `
    <div class= "productText">${productString}</div>
    <button class="remove-button"> remove </button>
    <button class="edit-button"> edit </button>`
    productContainer.innerHTML = productDiv;
    divContainer.appendChild(productContainer);
    searchInput.value = "";
  }
  catch (e) {
    console.log(e);
  }
};

const deleteOrEdit = async (e) => {
  const target = e.target;
  const productDiv = target.parentNode;
  const productString = productDiv.children[0].innerHTML;
  const productId = Array.from(divContainer.children).indexOf(productDiv) + 1;
  //console.log(productDiv);
  if (target.className === "remove-button") {
    deleteProduct(productId);
    console.log("product was deleted");
    productDiv.remove();
  }
  else if (target.className === "edit-button") {
    console.log("i need to edit this"); //TODO edit
  }
}

const deleteProduct = async (productId) => {
  await axios.delete(`http://localhost:3000/products/${productId}`);
}

const editProduct = async (productId) => {
  await axios.put(`http://localhost:3000/products/${productId}`);
}



//event listeneres
searchButton.addEventListener("click", () => {
  addProduct(searchInput.value);

})

divContainer.addEventListener("click", deleteOrEdit)
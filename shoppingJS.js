const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButon");
const divContainer = document.getElementById("divContainer");


const printProducts = async () => {
  divContainer.innerHTML = "";
  const { data } = await axios.get(`http://localhost:3000/products`)
  data.forEach(productObj => {
    let productContainer = document.createElement('div')
    productContainer.className = "productContainer"
    productContainer.id = `id-${productObj.id}`;
    let productDiv = `
    <div class= "productText">${productObj.product}</div>
    <div class="buttons"><button class="remove-button"> remove </button>
    <button class="edit-button"> edit </button></div>`
    productContainer.innerHTML = productDiv;
    divContainer.appendChild(productContainer);
  });
}

printProducts();





const addProduct = async (productString) => {
  try {
    const productObj = await axios.post(`http://localhost:3000/products`, {
      product: productString
    });
    let productContainer = document.createElement('div')
    productContainer.className = "productContainer"
    productContainer.id = `id-${productObj.id}`;
    let productDiv = `
    <div class= "productText">${productString}</div>
    <div class="buttons"><button class="remove-button"> remove </button>
    <button class="edit-button"> edit </button></div>`
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
  const productDiv = target.parentNode.parentNode;
  let productString = productDiv.children[0].innerHTML;
  const productId = productDiv.id.substring(3);

  if (target.className === "remove-button") {
    productDiv.remove();
    deleteProduct(productId);
    console.log("product was deleted");

  }
  else if (target.className === "edit-button") {
    editProduct(productId, productString).then((productEdit) => {
      productString = productEdit;
      // printProducts();
    });
  }
}

const deleteProduct = (productId) => {
  axios.delete(`http://localhost:3000/products/${productId}`);
}

const editProduct = async (productId, productString) => {
  const productEdit = prompt("Enter product", productString);
  await axios.put(`http://localhost:3000/products/${productId}`,
    { product: productEdit });
  return productEdit;

}



//event listeneres
searchButton.addEventListener("click", () => {
  addProduct(searchInput.value);

})

divContainer.addEventListener("click", deleteOrEdit)
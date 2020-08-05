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

const searchProduct = async (productString) => {
  try {
    const prodObj = { product: productString };

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


searchButton.addEventListener("click", () => {
  searchProduct(searchInput.value);

})
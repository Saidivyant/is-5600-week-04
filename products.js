const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

async function list (options = {}) {
    const { offset = 0, limit = 25, tag } = options
    const data = await fs.readFile(productsFile)
  
    return JSON.parse(data)
    .filter(product => {
      if(!tag){
        return product
      }

      return product.tags.find( ({title}) => title == tag)
    })
    .slice(offset, offset + limit) 
  }

  async function get (id) {
    const products = JSON.parse(await fs.readFile(productsFile))
  
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        return products[i]
      }
    }
  
    return null;
}
async function update(id, data) {
  console.log(`Product ${id} would be updated with:`, data);
  return true; // Placeholder response
}

async function deleteProduct(id) {
  console.log(`Product ${id} would be deleted`);
  return true; // Placeholder response
}

module.exports = {
    list,
    get,
    update,
    deleteProduct,
}
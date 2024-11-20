const fs = require('fs').promises
const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  }
  
  /**
   * List all products
   * @param {object} req
   * @param {object} res
   */
  async function listProducts(req, res) {
    const { offset = 0, limit = 25, tag } = req.query

   
      res.json(await Products.list({
        offset: Number(offset),
        limit: Number(limit),
        tag,
      }))
   
}

async function getProduct (req, res, next) {

  const { id } = req.params

    const product = await Products.get(id)
    if (!product) {
      return next()
    }

    return res.json(product)
  
}

async function createProduct (req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
}

async function editProduct(req, res, next) {
  const { id } = req.params;
  const updatedData = req.body;
  console.log(`Product ${id} updated with data:`, updatedData);
  res.status(200).json({ success: true, message: `Product ${id} updated` });
}

async function deleteProduct(req, res, next) {
  const { id } = req.params;
  console.log(`Product ${id} deleted`);
  res.status(202).json({ success: true, message: `Product ${id} deleted` });
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
});
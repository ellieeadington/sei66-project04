const { Product } = require("../models/Product");
  
exports.search_post = (req, res) => {
    let searched = req.query.title
    Product.find()
    .then((products) => {
        const filters = req.query;
        const filteredProducts = products.filter((product) => {
            let isValid = true 
            for (key in filters) {
                isValid = isValid && product[key] == filters[key];
              }
              return isValid;
        })

    res.json(filteredProducts)
})
.catch(error => {
    console.log(error)
})
}
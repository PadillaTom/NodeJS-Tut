const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //
  // :::::: My SQL ::::::
  // const product = new Product(null, title, imageUrl, description, price);
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect('/');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //
  // :::::: SEQUELIZE ::::::
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  })
    .then((result) => {
      // console.log(result);
      console.log('Creation OK');
      res.redirect('/admin/products');
    })
    .catch((err) => {
      console.log(err);
    });
};
// GET Edit Product:
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  // ::::: MYSQL :::::
  // Product.findById(prodId, (product) => {
  //   if (!product) {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: editMode,
  //     product: product,
  //   });
  // });
  //
  // :::::: SEQUELIZE ::::::
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        res.redirect('/');
      } else {
        res.render('admin/edit-product', {
          path: '/admin/edit-product',
          pageTitle: 'Edit Product',
          product: product,
          editing: editMode,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// POST Edit Product:
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // ::::: MYSQL :::::
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  // updatedProduct.save();
  // res.redirect('/admin/products');
  //
  // :::::: SEQUELIZE ::::::
  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save();
    })
    .then((result) => {
      console.log('Product Updated');
      res.redirect('/admin/products');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  // ::::: MYSQL :::::
  // Product.fetchAll((products) => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products',
  //   });
  // });
  //
  // :::::: SEQUELIZE ::::::
  Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        path: '/admin/products',
        pageTitle: 'Admin Products',
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// POST Delete:
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // ::::: MYSQL :::::
  // Product.deleteById(prodId);
  // res.redirect('/admin/products');
  //
  // :::::: SEQUELIZE ::::::
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log('Destroyed Done');
      res.redirect('/admin/products');
    })
    .catch((err) => {
      console.log(err);
    });
};

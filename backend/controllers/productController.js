const getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'this route wil show all products in database'
  });
};

exports.getProducts = getProducts;

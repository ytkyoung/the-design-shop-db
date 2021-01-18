const add_get = (req, res) => {
  res.render('add');
};

const add_post = (req, res) => {
  // console.log(req.body);
  // const newGalleryItem = new GalleryItem({
  //   title: req.body.title,
  //   brand: req.body.brand,
  //   price: req.body.price,
  //   img: req.body.img,
  //   link: req.body.link,
  //   spalten: req.body.spalten,
  // });
  const newGalleryItem = new GalleryItem(req.body);
  newGalleryItem
    .save()
    .then((result) => {
      // res.send(result)
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

module.exports = {
  add_get,
  add_post,
};

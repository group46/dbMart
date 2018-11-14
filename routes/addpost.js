const fs = require('fs');

module.exports = {


  getAddPostPage: (req, res) => {
    res.send("add post page")
    res.render('add-post.ejs', {
      title: "DBMart | Create New Post",
      message: '',
    });
  },
  addPostPage: (req, res) => {
    // if (!req.files) {
    res.send("respond 2")
      // return res.status(400).send("No files were uploaded.");
      console.log('line 13 reached');
    // }

    let postid = "SELECT COUNT(*) + 1 FROM 'product_posts'";
    let postby = "SELECT uid FROM product_posts";
    // let prodname = '';
    // let proddescription = '';
    // let date = '';
    // let price = '';
    // let sold = '';
    // let uploadedFile = req.files.image;
    // let image_name = uploadedFile.name;
    // let fileExtension = uploadedFile.mimetype.split('/')[1];
    // image_name = postby + '.' + fileExtension;


    // WHY WOULD YOU NEED THIS?
    // db.query(postid, (err, result) => {
    //   if (err) {
    //     return res.status(500).send(err);
    //   }
    //   if (result) {
    //     message = 'Post added';
    //     res.render('', {
    //       message,
    //       title: "DBMart | Post Created"
    //     });
    //   }
    // });
}
};

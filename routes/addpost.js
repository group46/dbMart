const fs = require('fs');

module.exports = {


  getAddPostPage: (req, res) => {
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

    let qpostid = "SELECT COUNT(*) + 1 FROM 'product_posts'";
    let postbyid = req.body.postbyid;
    let product_name = req.body.product_name;
    let product_description = req.body.product_description;
    let post_date = req.body.post_date;
    let price = req.body.price;
    let sold = 0;
    // let uploadedFile = req.files.image;
    // let image_name = uploadedFile.name;
    // let fileExtension = uploadedFile.mimetype.split('/')[1];
    // image_name = postby + '.' + fileExtension;

    // conditional queries
    let qpostby = "SELECT uid FROM user WHERE uid = '" + postbyid + "'";


    db.query(qpostby, (err, result) => {
      if (err) {
        return res.status(500).send(err);
        console.log("error man");
      }

// If no such user, redirect to Login page (after Alex pushes)
      // if (result.value == NULL) {
      //   message = 'User does not exist. Create a new account.'
      //   res.render('add-acc.ejs' , {
      //     message,
      //     title: ""
      //   });
      // }

      else {
        // everything should work fine
        let postquery = "INSERT INTO product_posts (postid, uid, product_description, product_name, post_date, price, sold) VALUES ('qpostid',  'postbyid' , 'product_name' , 'product_description', 'post_date', 'price', 'sold')";
        db.query(postquery, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.redirect('/');
        });
      }
    });
  }
}

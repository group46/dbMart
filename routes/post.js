const fs = require('fs');

module.exports = {

  getAddPostPage: (req, res) => {
    res.render('add-post.ejs', {
      title: "DBMart | Create New Post",
      message: '',
    });
  },



  addPostPage: (req, res) => {
    console.log('line 13 reached');
    // res.send("respond 2") <-- the bane of my existence
    let newpostid = '';
    let post_by_id = req.body.uid;
    let product_name = req.body.product_name;
    let product_description = req.body.product_description;

    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd<10) {
      dd = '0'+dd
    }
    if (mm<10) {
      mm = '0'+mm
    }
    var today = yyyy + '-' + mm + '-' + dd;

    let post_date = today;
    let price = req.body.price;
    // let sold = 0; automatically false

    let postidquery = "SELECT * FROM product_posts";
    let currentpostid = "SELECT uid FROM product_posts WHERE uid = '" + post_by_id + "'";


    db.query(postidquery, (err, result1) => {
      if (err) {
        return res.status(500).send(err);
        console.log("postidquery error");
      }
      // create a unique postid
      else {
        newpostid = result1.length + 1;

        // then do another query to check if user exists
        db.query(currentpostid, (err, result2) => {
          if (err) {
            return res.status(500).send(err);
            console.log("cannot get list of users");
          }

          // if account doesn't exist, pls create account
          if (result2.length == 0) { // if no results
            // if post_by_id is inside result2 array, return positive number

            message = "User does not exist. Create a new account."
            console.log("user does not exist. create a new account");
            res.redirect('/createacc'), {
              message,
              title: "DBMart | Account Creation"
            }
          }
          // if account exists AND postid captured then add into database
          // where would i get uid from? oh it's just post_by_id.
          else {
            let postquery = "INSERT INTO product_posts(postid, uid, product_description, product_name, post_date, price) VALUES ('" + newpostid + "', '" + post_by_id + "', '" + product_description + "', '" + product_name + "', '" + post_date + "', '" + price + "')";
            db.query(postquery, (err, result3) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.redirect('/');
            });
          }
        });
      }
    });
  },



  deletePost: (req, res)=> {
    let inputpostid = req.params.postid;
    let getpostID = 'SELECT * FROM product_posts WHERE postid = "' + inputpostid +'"';
    let deletePostQuery = 'DELETE FROM product_posts WHERE postid = "' + inputpostid + '"';

    db.query(getpostID, (err, result) => {
      if (err) {
        return res.status(500).send(err);
        console.log("not");
      }
      // if problem retrieving postID, then delete post
      else {
        db.query(deletePostQuery, (err, result) => {
          if (err) {
            return res.status(500).send(err);
            console.log("no2");
          }
          console.log("delete works!");
          return res.redirect('/');
        });
      }

    });
  }
}

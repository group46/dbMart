const fs = require('fs');

module.exports = {

  getAddPostPage: (req, res) => {
    res.render('add-post.ejs', {
      title: "DBMart | Create New Post",
      message: '',
    });
  },



  addPostPage: (req, res) => {
    let newpostid = '';
    let post_by_id = req.body.post_by_id;
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
    // console.log(post_by_id);
    let currentpostid = "SELECT uid FROM user WHERE uid = '" + post_by_id + "'";

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
          console.log(result2);
          // if account doesn't exist, pls create account
          if (result2.length != 1) { // if no results
            message = "User does not exist. Create a new account."
            // console.log("user does not exist. create a new account");
            console.log(result2.length)
            res.render('add-acc.ejs', {
                title: "DBMart | Account Creation",
                message: "User does not exist. Create a new account."
            });
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

  editPostPage: (req, res) => {
    let post_id = req.params.postid;
    let query = "SELECT * FROM product_posts WHERE postid = '" + post_id + "'";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      else {
        res.render('edit-post.ejs', {
          title: "DB Mart | Edit Post",
          message: '',
        });
      }
    });
  },

  editPost: (req, res) => {
    let post_id = req.params.postid;
    let product_name = req.body.product_name;
    let product_description = req.body.product_description;
    let price = req.body.price;

    let editquery = "UPDATE product_posts SET product_name = '" + product_name + "', `product_description` = '" + product_description + "', `price` = '" + price + "' WHERE postid = '" + post_id + "'";
    // let editquery = "SELECT * FROM product_posts WHERE postid = '" + post_id + "'";
    db.query(editquery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
        console.log("errday")
      }
      else
        res.redirect('/');
    });
    },
    deletePostPopUp: (req, res) => {
        let post_id = req.params.postid;
        res.render('deletePopUp.ejs', {
            title: "DB Mart | Enter the uid and password"
            ,message: post_id
        });
    },
    deletePost: (req, res)=> {
        let inputpostid = req.params.postid;
        let userid = req.body.username;
        let pass = req.body.password;
        let getpostID = "SELECT p.postid, u.uid, u.password FROM product_posts p, user u WHERE p.uid = u.uid and p.uid = '" + userid + "' and u.password = '" + pass + "' and p.postid = '" + inputpostid + "'";
        let deletePostQuery = "DELETE FROM product_posts WHERE postid = '" + inputpostid + "'";

        console.log(inputpostid);

        db.query(getpostID, (err, result1) => {
            if (err) {
                return res.status(500).send(err);
                console.log("not");
            } else {
                // if no problem retrieving postID, then delete post
                if (result1.length > 0) {
                    db.query(deletePostQuery, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                            console.log("no2");
                        }
                        console.log("delete works!");
                        return res.redirect('/');
                    });
                } else {
                    res.render('deletePopUp.ejs', {
                        title: "DB Mart | Enter the uid and password"
                        , message: inputpostid, message2: "Wrong user id and password combination. Please try again."
                    });
                }
            }
        });
    },
}

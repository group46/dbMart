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

    let qpostid = "SELECT COUNT(*) + 1 FROM 'product_posts'";
    let post_by_id = req.body.uid;
    let product_name = req.body.product_name;
    let product_description = req.body.product_description;
    let post_date = "";
    let price = req.body.price;
    let sold = 0;

 // conditional queries
    // let finduidquery = "SELECT uid FROM user WHERE postid = '" + post_by_id + "'";

    // add a +1 to postid to create a new post
    // let newuidquery = "SELECT uid FROM product_posts WHERE postid = (select COUNT(*) +1 FROM product_posts)";

    // check if user exists
    let finduidquery = "SELECT uid FROM product_posts WHERE '" + post_by_id + "'";

    console.log('line 32 reached');

    db.query(finduidquery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.value != post_by_id) { // doesn't work?
          // message = 'User does not exist. Create a new account.';
          console.log(finduidquery);
          res.redirect('/add-acc');
        }
        else {
          let postquery = "INSERT INTO product_posts(postid) VALUES ('" + qpostid + "')"; // format?

          db.query(postquery, (err, result) => {
            if (err) {
              return res.status(500).send(err);
            }
            else {
              console.log(res);
            }
          });
        }

// issue not here - probably with render

    });
    },






















//     db.query(finduidquery, (err, result) => {
//       if (err) {
//         return res.status(500).send(err);
//         console.log("error man");
//       }
//
// // // If no such user, redirect to Login page (after Alex pushes)
// //       if (result.value == "uid") {
// //         message = 'User does not exist. Create a new account.'
// //         res.render('add-acc.ejs' , {
// //           message,
// //           title: ""
// //         });
// //       }
//
//       else {
//         // everything should work fine
//         // if (result contains uid)
//         console.log("pre query reached");
//         // let postquery = "INSERT INTO product_posts(postid, uid, product_description, product_name, post_date, price, sold) VALUES ('" + qpostid + "', '" + post_by_id + "', '" + product_name + "', '" + product_description + "', '" + post_date + "', '" + price + "', '" + sold + "')";
//         let postquery = "INSERT INTO product_posts(postid, product_name) VALUES ('" + qpostid + "', '" + product_name + "')";
//
//
//         db.query(postquery, (err, result) => {
//           if (err) {
//               return res.status(500).send(err);
//           }
//           console.log('add works');
//           res.redirect('/');
//         });
//       }
//     });
//   },


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
          res.redirect('/');
        });
      }

    });
  }
}

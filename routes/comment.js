module.exports = {
  retrieveCommentPage: (req, res) => {
    res.render('comment.ejs', {
        title: "DBMart | Create New Post"
    });
  },
  submitComment: (req, res) => {
    let commentid = '';
    let postid = req.params.postid;
    let uid = req.body.post_by_id;
    let password = req.body.password;
    let commenttxt = req.body.comment;
    let commentdate = new Date();
    let edited = 0;

    // set the commentdate variable to the current date using the correct format...
    var day = commentdate.getDate();
    var month = commentdate.getMonth();
    var year = commentdate.getFullYear();

    month++;
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    commentdate = year + '-' + month + '-' + day;

    let postidQuery = "SELECT MAX(commentid) AS commentid FROM comment_authors;";
    let accountQuery = "SELECT uid, password FROM user WHERE uid = " + uid;

    db.query(postidQuery, (err, resultOne) => {
      if (err) {
        res.send(err);
      }
      commentid = resultOne[0].commentid + 1;
      console.log(commentid);
      db.query(accountQuery, (err, resultTwo) => {
        if (err) {
          return res.status(500).send(err);
          console.log("Access Denied : No Such Username");
          //'Access Denied : No Such Username'
        }
        if (resultTwo.length != 1) {
            console.log(resultTwo.length)
            res.render('add-acc.ejs', {
                title: "DBMart | Account Creation",
                message: "Access Denied : No Such Username"
            });
        } else if ((resultTwo[0].uid == uid) && (resultTwo[0].password == password)) {
          let insert = "INSERT INTO comment_authors VALUES ('" + commentid + "', '" + postid + "', '" + uid + "', '" + commenttxt + "', '" + commentdate + "', '" + edited + "')";
          db.query(insert, (err, resultThree) => {
              if (err) {
                  return res.status(500).send(err);
                  }
              res.redirect('/');
          });
        } else {
          console.log("wrong password");
          res.render('add-post.ejs', {
            title: "DB Mart | Add Post",
            message: "Access Denied : Wrong Password" ,
          });
        }
      })
    })
  },
}

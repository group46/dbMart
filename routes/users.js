module.exports = {
    getUsers: (req, res) => {
        let query = "SELECT uid, first_name, last_name, DATE_FORMAT(`birthdate`, '%Y-%m-%d') AS birthdate FROM `user` ORDER BY first_name DESC"; // get all users and order by first name

        // query executed
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('users.ejs', {
                title: "DBMart | Users"
                ,users: result,
                message: ""
            });
        });
    },

    getSingleUser: (req, res) => {
        let userid = req.body.userid
        let pass = req.body.password
        let nameQuery = "SELECT * FROM 'user' AS u WHERE u.uid = '" + uid + "'"

        db.query(nameQuery, (err, result) => {
          if (err) {
            console.log(err)
          }
          if (result.length = 0) {
                  res.redirect('/add-acc')
          } else {
            let query = "SELECT uid, first_name, last_name, password, DATE_FORMAT(`birthdate`, '%Y-%m-%d') AS birthdate FROM `user` WHERE (uid = '" + userid + "' AND password = '" + pass + "')"
            db.query(query, (err,result1) => {
              if (err) {
                console.log(err)
              }
              //else should just return single user
            })
        }
      })
    },

    getBuyers: (req, res) => {
        let query = "SELECT uid, first_name, last_name, DATE_FORMAT(`birthdate`, '%Y-%m-%d') AS birthdate FROM `buyer` ORDER BY first_name DESC"

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/')
            }
            res.render('users.ejs', {
                title: "DBMart | Buyers"
                ,users: result,
                message: ""
            });
        });
    },

    getSellers: (req, res) => {
        let query = "SELECT uid, first_name, last_name, DATE_FORMAT(`birthdate`, '%Y-%m-%d') AS birthdate FROM `seller`"

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/')
            }
            res.render('users.ejs', {
                title: "DBMart | Sellers"
                ,users: result,
                message: ""
            });
        });
    },

    insertUser: (req, res) => {
        let uid = req.body.user_id
        let first_name = req.body.first_name
        let last_name = req.body.last_name
        let password = req.body.password
        let birthdate = req.body.birthdate

        let insertCheck = "SELECT * FROM `user` WHERE uid = '" + uid + "'"
        let insertUser = "INSERT INTO `user` VALUES ('" + uid + "', '" + first_name + "', '" + last_name + "', '" + password + "', '" + birthdate + "')"
        let userView = "SELECT * FROM `current_users`"

        db.query(insertCheck, (err, res1) => {
            if (err) {
                message = "Error in first uid verification query"
                console.log(mess);
            }
            if (res1.length > 0) {
                res.render('add-acc.ejs', {
                    title: "DBMart | Account Creation"
                    ,message: "Redundant username, please pick another username!"
                });
            } else {
                db.query(insertUser, (err, res2) => {
                    if (err) {
                        message = "Invalid entry, could not create account.";
                    }
                    db.query(userView, (err, res3) => {
                        if (err) {
                            message = "something went wrong with showing you the new user.";
                        }
                        console.log("User account created!");
                        res.render('users.ejs', {
                            title: "DBMart | Account Created"
                            ,users: res3
                            ,message: "User account successfully created!"
                        });
                    });
                });
            }
        });
    },

    insertSeller: (req, res) => {

      let uid = req.body.uid
      let first_name = req.body.first_name
      let last_name = req.body.last_name
      let password = req.body.password
      let birthdate = req.body.birthdate

      let nameQuery = "SELECT * FROM `user` AS u WHERE u.uid = '" + uid + "'"
      let query = "INSERT INTO `seller` (uid, first_name, last_name, birthdate) values ('" + uid + "', '" + first_name + "', '" + last_name + "', '" + password + "', '" + birthdate + "')"

      db.query(nameQuery,(err, res) => {
        if (err) {
          //print invalid entry?
          console.log(err)
        }
        //if userid is empty, no user exists, redirects to make new acc
        if (res.length = 0) {
          res.redirect('/add-acc')
        } else {
          db.query(query, (err, res) => {
            console.log(res)
          })
        }
      })
    },
}

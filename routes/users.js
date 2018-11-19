module.exports = {
    getUsers: (req, res) => {
        let query = "SELECT uid, first_name, last_name, DATE_FORMAT(`birthdate`, '%Y-%m-%d') AS birthdate FROM `user` ORDER BY uid"; // get all users and order by first name

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
                console.log(message);
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
                            message = "something went wrong with showing you the current userbase.";
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
    getUsersDate: (req, res) => {
        let query = "SELECT uid, first_name, last_name, DATE_FORMAT(`birthdate`, '%Y-%m-%d') AS birthdate FROM `user` ORDER BY birthdate DESC"; // get all users and order by first name
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
}

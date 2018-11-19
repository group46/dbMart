module.exports = {

    getLogin: (req, res) => {
        let query = "SELECT uid, first_name, last_name, DATE_FORMAT(`birthdate`, '%Y-%m-%d') AS birthdate FROM `user` ORDER BY first_name DESC"; // get all users and order by first name

        // query executed
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('login.ejs', {
                title: "DBMart | Accounts"
                ,posts: result, message: "Access and edit your account by typing in your username and password!"
            });
        });
    },

    gotoSettings: (req,res) => {

      let userid = req.body.uid
      let pass = req.body.password
      let nameQuery = "SELECT * FROM `user` AS u WHERE (u.uid = '" + userid + "' AND u.password = '" + pass + "')"

      db.query(nameQuery, (err, res1) => {
        if (err) {
          console.log(err)
        }
        if (res1.length = 0) {
                res.redirect('/add-acc')
        } else {
          db.query(nameQuery,(err,res2) => {
            if (err) {
              console.log(err)
            }
            res.render('acc-settings.ejs', {
              title: "DBMart | Account Settings"
              , user: res2[0]
              , message: "Settings"
            })
          })
        }
      })
    },

    updateUser: (req,res) => {

      let uid = req.body.userid
      let first_name = req.body.nfname
      let last_name = req.body.nlname
      let password = req.body.npass
      let birthdate = req.body.ndate
      let newuser = {uid,first_name,last_name,password,birthdate}
      //console.log(newuser)

      let updateQuery = "UPDATE `user` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `password` = '" + password + "', `birthdate` = '" + birthdate + "' WHERE `uid`='" + uid + "'"
      db.query(updateQuery, (err,res1) => {
        if (err) {
          console.log(err)
        }
        if (res1) {
          res.render('acc-settings.ejs', {
            title: "DBMart | Account Settings"
            , user: newuser
            , message: "User updated"
          })
        } else {
          res.render('acc-settings.ejs', {
            title: "DBMart | Account Settings"
            , user: null
            , message: "Failed to update, try again"
          })
        }
      })
    }
}

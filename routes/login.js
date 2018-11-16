//const {gotoSettings} = require('./routes/users')
module.exports = {

    getLogin: (req, res) => {
        let query = "SELECT uid, first_name, last_name, DATE_FORMAT(`birthdate`, '%Y-%m-%d') AS birthdate FROM `user` ORDER BY first_name DESC"; // get all users and order by first name

        // query executed
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('login.ejs', {
                title: "DBMart | Login"
                ,posts: result
            });
        });
    },

    gotoSettings: (req,res) => {
      console.log(req.body)
      let userid = req.body.username
      let pass = req.body.password
      let nameQuery = "SELECT * FROM `user` AS u WHERE (u.uid = '" + userid + "' AND u.password = '" + pass + "')"

      db.query(nameQuery, (err, res1) => {
        if (err) {
          console.log(err)
        }
        if (res1.length = 0) {
                res.redirect('/add-acc')
        } else {
          console.log(res1)
          res.render('acc-settings.ejs', {
            title: "DBMart | Account Settings"
            , user: res1
            , message: "Settings"
          })
        }

      })
    },

    updateUser: (req,res) => {
      
    }
}

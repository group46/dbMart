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

    gotoSettings: (req,res,getSingleUser) => {

      var userid = req.body.username
      var pass = req.body.password
      let nameQuery = "SELECT * FROM `user` WHERE (uid = '" + userid + "' AND password = '" + pass +"')"

      db.query(nameQuery, (err, res) => {
        if (err) {
          console.log("error at query1")
          console.log(err)
        }
        if (res.length = 0) {
                res.redirect('/add-acc')
        }
      })
      res.render('acc-settings.ejs', {
        title: "DBMart | Account Settings"
        , user: res
        , message: "Settings"
      })
    }
}

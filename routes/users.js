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
                ,users: result
            });
        });
    },

    getBuyers: (req, res) => {
      let query = "SELECT uid, first_name, last_name, DATE_FORMAT(`birthdate`, '%Y-%m-%d') AS birthdate FROM `buyer` ORDER BY first_name DESC"
      db.query(query, (err, result) => {
        if (err) {
          res.redirect('/')
        }
        res.render('users.ejs', {
          title: "DBMart | Buyers"
          , users: result
        })
      })
    },

    getSellers: (req, res) => {
      let query = "SELECT uid, first_name, last_name, DATE_FORMAT(`birthdate`, '%Y-%m-%d') AS birthdate FROM `seller`"

      db.query(query, (err, result) => {
        if (err) {
          res.redirect('/')
        }
        res.render('users.ejs', {
          title: "DBMart | Sellers"
          , users: result
        })
      })
    },

    insertBuyer: (req, res) => {

      let uid = req.body.uid
      let first_name = req.body.first_name
      let last_name = req.body.last_name
      let password = req.body.password
      let birthdate = req.body.birthdate

      let nameQuery = "SELECT * FROM 'user' AS u WHERE u.uid = '" + uid + "'"
      let query = "INSERT INTO 'buyer' (uid, first_name, last_name, birthdate) values ('" + uid + "', '" + first_name + "', '" + last_name + "', '" + password + "', '" + birthdate + "')"

      db.query(nameQuery,(err, res) => {
        if (err) {
          throw err
          console.log(err)
        }
        //if userid is empty, no user exists, redirects to make new acc
        if (res.length = 0) {
                res.redirect('/add-acc')
        } else {
          //if error, throw random invalid entry, else add user to buyers
          db.query(query, (err, res) => {
            if (err) {
              throw err
              message = "Invalid entry";
              res.render('productpost.ejs', {
                message,
                title: "DBMart | Make new post"
              })
            } else {
            //log insertion, no extra render needed?
            console.log(res)
            //res.redirect('/makepost-buy')
          }
        })
      }
    })
  },

    insertSeller: (req, res) => {

      let uid = req.body.uid
      let first_name = req.body.first_name
      let last_name = req.body.last_name
      let password = req.body.password
      let birthdate = req.body.birthdate

      let nameQuery = "SELECT * FROM 'user' AS u WHERE u.uid = '" + uid + "'"
      let query = "INSERT INTO 'seller' (uid, first_name, last_name, birthdate) values ('" + uid + "', '" + first_name + "', '" + last_name + "', '" + password + "', '" + birthdate + "')"

      db.query(nameQuery,(err, res) => {
        if (err) {
          throw err
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

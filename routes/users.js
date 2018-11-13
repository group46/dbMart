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
      let query = "SELECT uid, first_name, last_name, DATE_FORMAT(`birthdate`, '%Y-%m-%d') AS birthdate FROM `user` GROUP BY u_type='buyer'"

      db.query(query, (err, result)) => {
        if (err) {
          res.redirect('/')
        }
        res.render('users.ejs', {
          title: "DBMart | Buyers"
          , users: result
        })
      }
    },

    getSellers: (req, res) => {
      let query = "SELECT uid, first_name, last_name, DATE_FORMAT(`birthdate`, '%Y-%m-%d') AS birthdate FROM `user` GROUP BY u_type='seller'"

      db.query(query, (err, result)) => {
        if (err) {
          res.redirect('/')
        }
        res.render('users.ejs', {
          title: "DBMart | Sellers"
          , users: result
        })
      }
    },

    insertBuyer: (req, res) => {
      let query = "INSERT INTO Buyers (uid, first_name, last_name, birthdate) values ()"
      db.query(query,(err, res, fields) => {
        if (err) throw err;
        console.log(result)
      })
    },

    insertSeller: (req, res) => {
      let query = "INSERT INTO Sellers (uid, first_name, last_name, birthdate) values ()"
      db.query(query,(err, res, fields) => {
        if (err) throw err;
        console.log(result)
      })
    },
}

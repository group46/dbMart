// begin to add routes. Routes to main page (index.ejs)

module.exports = {
    getMainPage: (req, res) => {
        let query = "SELECT postid, uid, product_name, product_description, DATE_FORMAT(`post_date`, '%Y-%m-%d') AS post_date, price, sold, CASE WHEN sold='1' THEN 'true' ELSE 'false' END AS sold FROM `product_posts` ORDER BY post_date DESC"; // get all posts and order by asc post date

        // query executed
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "DBMart | Checkout all product posts!"
                ,posts: result
            });
        });
    },
    getMainDate: (req, res) => {
        let query = "SELECT postid, uid, product_name, product_description, DATE_FORMAT(`post_date`, '%Y-%m-%d') AS post_date, price, sold, CASE WHEN sold='1' THEN 'true' ELSE 'false' END AS sold FROM `product_posts` ORDER BY post_date"; // get all posts and order by asc post date

        // query executed
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "DBMart | Checkout all product posts!"
                ,posts: result
            });
        });
    },
    getMainPrice: (req, res) => {
        let query = "SELECT postid, uid, product_name, product_description, DATE_FORMAT(`post_date`, '%Y-%m-%d') AS post_date, price, sold, CASE WHEN sold='1' THEN 'true' ELSE 'false' END AS sold FROM `product_posts` ORDER BY price"; // get all posts and order by asc post date

        // query executed
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "DBMart | Checkout all product posts!"
                ,posts: result
            });
        });
    },
    getAccCreatePage: (req, res) => {
      let query = "SELECT postid, uid, product_name, product_description, DATE_FORMAT(`post_date`, '%Y-%m-%d') AS post_date, price, sold, CASE WHEN sold='1' THEN 'true' ELSE 'false' END AS sold FROM `product_posts` ORDER BY post_date DESC"; // get all posts and order by asc post date

      // query executed
      db.query(query, (err, result) => {
          if (err) {
              res.redirect('/');
          }
          res.render('add-acc.ejs', {
              title: "DBMart | Create Acc"
              ,message: "create account"
            })
      })
    }
};

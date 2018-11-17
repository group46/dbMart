// begin to add routes. Routes to main page (index.ejs)

module.exports = {
    getMainPage: (req, res) => {
        // let query = "SELECT postid, uid, product_name, product_description, DATE_FORMAT(`post_date`, '%Y-%m-%d') AS post_date, price, sold, CASE WHEN sold='1' THEN 'true' ELSE 'false' END AS sold FROM `product_posts` ORDER BY post_date DESC"; // get all posts and order by asc post date

        let query =
        "SELECT * FROM main_table ORDER BY postid DESC"

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
        let query = "SELECT * FROM main_table ORDER BY date"
        let query1 =
        "SELECT p.postid, u.uid, CONCAT(u.first_name, ',', ' ', u.last_name) AS name, \
        p.product_name, CONCAT(SUBSTRING(p.product_description, 1, 30), '...') AS detail, \
        DATE_FORMAT(p.post_date, '%M %d %Y') AS date, p.price, \
        sold, CASE WHEN sold='1' THEN 'true' ELSE 'false' END AS sold, \
        COUNT(*) AS likes \
        FROM `user` u, `product_posts` p, `user_likes` ul \
        WHERE (u.uid = p.uid) and (p.postid = ul.postid) \
        GROUP BY u.uid, u.first_name, u.last_name, p.postid, p.product_name, p.product_description, p.post_date, p.price, sold \
        UNION ALL \
        SELECT p.postid, u.uid, CONCAT(u.first_name, ',', ' ', u.last_name) AS name, \
        p.product_name, CONCAT(SUBSTRING(p.product_description, 1, 30), '...') AS detail, \
        DATE_FORMAT(p.post_date, '%M %d %Y') AS date, p.price, \
        sold, CASE WHEN sold='1' THEN 'true' ELSE 'false' END AS sold, \
        0 AS likes \
        FROM `user` u, `product_posts` p, `user_likes` ul \
        WHERE (u.uid = p.uid) and (p.postid NOT IN (SELECT postid FROM user_likes)) \
        GROUP BY u.uid, u.first_name, u.last_name, p.postid, p.product_name, p.product_description, p.post_date, p.price \
        ORDER BY date"

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
        let query = "SELECT * FROM main_table ORDER BY price"
        let query1 =
        "SELECT p.postid, u.uid, CONCAT(u.first_name, ',', ' ', u.last_name) AS name, \
        p.product_name, CONCAT(SUBSTRING(p.product_description, 1, 30), '...') AS detail, \
        DATE_FORMAT(p.post_date, '%M %d %Y') AS date, p.price, \
        sold, CASE WHEN sold='1' THEN 'true' ELSE 'false' END AS sold, \
        COUNT(*) AS likes \
        FROM `user` u, `product_posts` p, `user_likes` ul \
        WHERE (u.uid = p.uid) and (p.postid = ul.postid) \
        GROUP BY u.uid, u.first_name, u.last_name, p.postid, p.product_name, p.product_description, p.post_date, p.price, sold \
        UNION ALL \
        SELECT p.postid, u.uid, CONCAT(u.first_name, ',', ' ', u.last_name) AS name, \
        p.product_name, CONCAT(SUBSTRING(p.product_description, 1, 30), '...') AS detail, \
        DATE_FORMAT(p.post_date, '%M %d %Y') AS date, p.price, \
        sold, CASE WHEN sold='1' THEN 'true' ELSE 'false' END AS sold, \
        0 AS likes \
        FROM `user` u, `product_posts` p, `user_likes` ul \
        WHERE (u.uid = p.uid) and (p.postid NOT IN (SELECT postid FROM user_likes)) \
        GROUP BY u.uid, u.first_name, u.last_name, p.postid, p.product_name, p.product_description, p.post_date, p.price \
        ORDER BY price"

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
    getMainLikes: (req, res) => {
        let query = "SELECT * FROM main_table ORDER BY likes DESC, DATE DESC"
        let query1 =
        "SELECT p.postid, u.uid, CONCAT(u.first_name, ', ', u.last_name) AS name, \
        p.product_name, CONCAT(SUBSTRING(p.product_description, 1, 30), '...') AS detail, \
        DATE_FORMAT(p.post_date, '%M %d %Y') AS date, p.price, \
        sold, CASE WHEN sold='1' THEN 'true' ELSE 'false' END AS sold, \
        COUNT(*) AS likes \
        FROM `user` u, `product_posts` p, `user_likes` ul \
        WHERE (u.uid = p.uid) and (p.postid = ul.postid) \
        GROUP BY u.uid, u.first_name, u.last_name, p.postid, p.product_name, p.product_description, p.post_date, p.price, sold \
        UNION ALL \
        SELECT p.postid, u.uid, CONCAT(u.first_name, ', ', u.last_name) AS name, \
        p.product_name, CONCAT(SUBSTRING(p.product_description, 1, 30), '...') AS detail, \
        DATE_FORMAT(p.post_date, '%M %d %Y') AS date, p.price, \
        sold, CASE WHEN sold='1' THEN 'true' ELSE 'false' END AS sold, \
        0 AS likes \
        FROM `user` u, `product_posts` p, `user_likes` ul \
        WHERE (u.uid = p.uid) and (p.postid NOT IN (SELECT postid FROM user_likes)) \
        GROUP BY u.uid, u.first_name, u.last_name, p.postid, p.product_name, p.product_description, p.post_date, p.price \
        ORDER BY likes DESC, DATE DESC"

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

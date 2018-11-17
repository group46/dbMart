module.exports = {
    getPriceRange: (req, res) => {
        // directs users to price range input page
        let query = "SELECT * FROM `current_posts`"; // get all postid of posts

        // query executed
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('pricetable.ejs', {
                title: "DBMart | Products in Price Range"
                ,message: "See current products for sale that are in your price range"
            });
        });
    },
    getPriceTable: (req, res) => {
        let message = '';
        let min = req.body.min_price;
        let max = req.body.max_price;

        let query = "SELECT * FROM `current_posts` WHERE (price >= '" + min + "') AND (price <= '" + max + "')";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('pricetablerender.ejs', {
                title: "DBMart | Products in Price Range"
                ,posts: result, message2: "Here are all the products between $ " + min + " - $ " + max + ":"
            })
            // else {
            //     res.render('pricetable.ejs', {
            //         title: "DBMart | Products in Price Range"
            //         ,
            //     })
            // }
        })
    },
}

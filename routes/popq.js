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
            });
            // else {
            //     res.render('pricetable.ejs', {
            //         title: "DBMart | Products in Price Range"
            //         ,
            //     })
            // }
        });
    },
    getUserAd: (req, res) => {
        let query = "\
        SELECT DISTINCT u.uid, CONCAT(u.first_name, ', ', u.last_name) AS 'Name', a.adid, a.adimage, a.adlink, atag.tag_name\
        FROM advertisement a, user u, ad_has_tag atag, user_interested ui \
        WHERE (a.adid = atag.adid) and (u.uid = ui.uid) and (ui.tag_name = atag.tag_name) \
        UNION ALL\
        SELECT u.uid, CONCAT(u.first_name, ', ', u.last_name) AS 'Name', 'No' AS 'a.adid', 'information', 'on User' AS 'a.adlink', '' AS 'atag.tag_name'\
        FROM user u \
        WHERE u.uid NOT IN \
            (SELECT u.uid \
            FROM advertisement a, user u, ad_has_tag at, user_interested ui \
            WHERE (a.adid = at.adid) and (u.uid = ui.uid) and (ui.tag_name = at.tag_name))\
        ORDER BY uid;"

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('user_interest.ejs', {
                title: "DBMart | User and Advertisement"
                ,table: result
            });
        });
    },
    getBestPost: (req,res) => {

		let query = "SELECT ul.postid AS 'postid', p.product_name AS 'name', \
		CONCAT(SUBSTRING(p.product_description, 1, 30), '...') AS 'detail', \
		DATE_FORMAT(p.post_date, '%M %d %Y') AS 'date', p.price AS 'price', p.sold, CASE WHEN p.sold='1' THEN 'true' ELSE 'false' END AS 'sold' \
		FROM user_likes ul, product_posts p \
		WHERE ul.postid = p.postid \
		GROUP BY ul.postid \
		HAVING count(ul.uid) = \
		(SELECT COUNT(*) FROM user);"

		db.query(query, (err,res1) => {
			if (err) {
                res.redirect('/');
    			console.log("something went wrong with the getBestPost query");
				throw err
			} else {
				res.render('best-post.ejs', {
					title: "DBMart | Best post"
					,posts: res1
					,message: "Post(s) liked by all users:"
				});
			}
		});
	},
}

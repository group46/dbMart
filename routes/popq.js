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

    	let divquery = "SELECT * FROM `user_likes` as u \
      WHERE NOT EXISTS (\
        (SELECT ul.uid FROM `user` as ul)\
         NOT IN\
         (SELECT ul1.uid FROM `user_likes` as ul1 WHERE ul1.postid = u.postid))";

    	db.query(divquery, (err,res1) => {
    		if (err) {
    			return res.status(500).send(err);
    		}
    		res.render('bestpost.ejs', {
    			title: "DBMart | Best posts"
    			,post: res1
    			,message: "Post liked by all:"
    		})
    	})
    }
}

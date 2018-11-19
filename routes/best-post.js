module.exports = {
	getBestPost: (req,res) => {

		let query = "SELECT ul.postid AS 'postid', p.product_name AS 'name', \
		CONCAT(SUBSTRING(p.product_description, 1, 30), '...') AS 'detail', \
		DATE_FORMAT(p.post_date, "%M %d %Y") AS 'date', p.price AS 'price', p.sold, CASE WHEN p.sold='1' THEN 'true' ELSE 'false' END AS 'sold' \
		FROM user_likes ul, product_posts p \
		WHERE ul.postid = p.postid \
		GROUP BY ul.postid \
		HAVING count(ul.uid) = \
		(SELECT COUNT(*) FROM user);)"

		db.query(query, (err,res1) => {
			if (err) {
				console.log("something went wrong with the getBestPost query");
				throw err
			} else {
				res.render('bestpost.ejs', {
					title: "DBMart | Best post"
					,post: res1
					,message: "Post(s) liked by all users:"
				});
			}
		});
	},
}


getBestPost(req,res) => {

	let query = "SELECT * FROM ‘user_likes‘ AS u WHERE NOT EXISTS ((SELECT ul.uid FROM ‘user_likes‘ AS ul) EXCEPT (SELECT ul1.uid FROM ‘user_likes‘ as ul1 WHERE ul1.post_id = u.post_id))"

	db.query(query, (err,res1) => {
		if (err) {
			throw err
		}
		res.render('bestpost.ejs', {
			title: "DBMart | Best post"
			,post: res1
			,message: "Post liked by all is:"
		})
	})

}
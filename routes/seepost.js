module.exports = {
  getProductComments: (req, res, next) => {

    var queries = [
      "SELECT CONCAT(user.first_name, ', ', user.last_name) AS name, DATE_FORMAT(comment.commentdate, '%Y-%m-%d') AS commentdate, comment.commenttxt AS commenttxt FROM product_posts product, comment_authors comment, user WHERE user.uid = comment.uid AND comment.postid = '" + req.params.postid + "' AND product.postid = '" + req.params.postid + "'",
      "SELECT product_name, product_description, DATE_FORMAT(`post_date`, '%Y-%m-%d') AS post_date, price, sold, CASE WHEN sold='1' THEN 'true' ELSE 'false' END AS sold FROM product_posts WHERE postid = '" + req.params.postid + "' ORDER BY post_date DESC"
    ];

    let query = queries.join(';');

    db.query(query, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.render('seepost.ejs', {
            title: "DBMart | Checkout all product posts!",
            postOne: result[0],
            postTwo: result[1]
        });
    });
  }
}

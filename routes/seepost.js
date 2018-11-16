module.exports = {
  getProductComments: (req, res) => {
    let query = "SELECT comment.uid AS uid, DATE_FORMAT(comment.commentdate, '%Y-%m-%d') AS commentdate, comment.commenttxt AS commenttxt FROM product_posts product, comment_authors comment WHERE product.postid = comment.postid AND product.postid = " + req.params.postid

    db.query(query, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.render('seepost.ejs', {
            title: "DBMart | Checkout all product posts!",
            posts: result
        });
    });
  }
}

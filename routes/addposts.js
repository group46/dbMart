module.exports = {
    getAddPost: (req, res) => {
        let query = "SELECT uid, first_name, last_name, DATE_FORMAT(`birthdate`, '%Y-%m-%d') AS birthdate FROM `user` ORDER BY first_name DESC"; // get all users and order by first name

        // query executed
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('login.ejs', {
                title: "DBMart | Login"
                ,posts: result
            });
        });
    },
}

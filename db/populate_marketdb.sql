-- insert 6 users: u1 to u6. u2, u3, u4 are both buyer AND seller
INSERT INTO user
VALUES ('u1', 'Gina', 'Hong', 'p1', '1997-11-03');

INSERT INTO user
VALUES ('u2', 'Boat', 'Mcboat', 'p2', '2007-01-03');

INSERT INTO user
VALUES ('u3', 'Tony', 'Stark', 'p3', '1971-09-23');

INSERT INTO user
VALUES ('u4', 'Steph', 'Curry', 'p4', '1988-05-03');

INSERT INTO user
VALUES ('u5', 'Kevin', 'Durant', 'p5', '1989-01-13');

INSERT INTO user
VALUES ('u6', 'John', 'Mayer', 'p6', '1977-09-10');


-- 4 advertisements. guitar, chef knife, warriors ticket, boat shop
INSERT INTO advertisement
VALUES ('1', 'ad_img1', 'electric guitar');

INSERT INTO advertisement
VALUES ('2', 'ad_img2', 'bargain mart');

INSERT INTO advertisement
VALUES ('3', 'ad_img3', 'warriors ticket');

INSERT INTO advertisement
VALUES ('4', 'ad_img4', 'boat shop');


-- 4 product posts.
INSERT INTO product_posts
VALUES ('1', 'u2', 'Beautiful boats with amenities inside. Looking to sell quick',
'Mcboatface Boat', '2017-11-08', 1899, 0);

INSERT INTO product_posts
VALUES ('2', 'u3', 'utilitiarian metal suit being sold for a bargain. broken during fight w/ friends. obo',
'Ironman MK V', '2018-09-24', 1000, 0);

INSERT INTO product_posts
VALUES ('4', 'u3', 'red, white, and blue metal disc. Good for frisbee. Slightly damaged',
'Used frisbee', '2018-11-11', 10, 0);

INSERT INTO product_posts
VALUES ('3', 'u4', 'Increase your range with these curry 4s',
'Curry 4', '2018-09-28', 299, 0);

INSERT INTO product_posts
VALUES ('5', 'u4', 'Latest Steph Curry shoes to drop. Great for point guards!',
'Curry 5s', '2018-11-13', 310, 0);


-- 4 tags: sports, electronic, boat, used
INSERT INTO tag
VALUES ('Sports');

INSERT INTO tag
VALUES ('Electronic');

INSERT INTO tag
VALUES ('Boat');

INSERT INTO tag
VALUES ('Used');


-- post and tag
-- boat is boat, mk V is elec and used, frisbee is sports and used, curry 4 is sports
INSERT INTO post_has_tag
VALUES ('1', 'Boat');

INSERT INTO post_has_tag
VALUES ('2', 'Electronic');
INSERT INTO post_has_tag
VALUES ('2', 'Used');

INSERT INTO post_has_tag
VALUES ('4', 'Sports');
INSERT INTO post_has_tag
VALUES ('4', 'Used');

INSERT INTO post_has_tag
VALUES ('3', 'Sports');


-- elec guitar is 'Electronic' tag
INSERT INTO ad_has_tag
VALUES ('1', 'Electronic');

INSERT INTO ad_has_tag
VALUES ('2', 'Used');

INSERT INTO ad_has_tag
VALUES ('3', 'Sports');

INSERT INTO ad_has_tag
VALUES ('4', 'Boat');


-- user_likes: curry 4 post has 2 likes, mk V has 6 likes, frisbee has 4 likes
INSERT INTO user_likes
VALUES ( 'u1', '3');
INSERT INTO user_likes
VALUES ( 'u2', '3');

INSERT INTO user_likes
VALUES ( 'u1', '2');
INSERT INTO user_likes
VALUES ( 'u2', '2');
INSERT INTO user_likes
VALUES ( 'u3', '2');
INSERT INTO user_likes
VALUES ( 'u4', '2');
INSERT INTO user_likes
VALUES ( 'u5', '2');
INSERT INTO user_likes
VALUES ( 'u6', '2');

INSERT INTO user_likes
VALUES ( 'u2', '4');
INSERT INTO user_likes
VALUES ( 'u3', '4');
INSERT INTO user_likes
VALUES ( 'u4', '4');
INSERT INTO user_likes
VALUES ( 'u5', '4');

-- 6 comments
INSERT INTO comment_authors
VALUES ( '1', '1', 'u3', 'This is the lamest boat Ive ever seen. Pathetic.', '2018-11-04', 0);

INSERT INTO comment_authors
VALUES ( '3', '2', 'u1', 'Interested in buying this.', '2018-11-09', 0);
INSERT INTO comment_authors
VALUES ( '4', '2', 'u3', 'Thanks for the interest.', '2018-11-09', 0);
INSERT INTO comment_authors
VALUES ( '5', '2', 'u5', 'This still available?', '2018-11-10', 0);
INSERT INTO comment_authors
VALUES ( '6', '2', 'u3', 'No its been sold.', '2018-11-10', 0);

INSERT INTO comment_authors
VALUES ( '2', '4', 'u6', 'Willing to trade?', '2018-11-04', 1);

-- 1 transaction_buys
INSERT INTO transaction_buys
VALUES ( '111', '0101', '0000', 'card', '2', 'u1');

UPDATE product_posts SET sold=1
WHERE postid='2';

-- create views
CREATE OR REPLACE VIEW main_table
AS
	SELECT p.postid, u.uid, CONCAT(u.first_name, ', ', u.last_name) AS 'name', p.product_name,
		CONCAT(SUBSTRING(p.product_description, 1, 30), '...') AS 'detail',
		DATE_FORMAT(p.post_date, "%M %d %Y") AS 'date', p.price, p.sold, CASE WHEN p.sold='1' THEN 'true' ELSE 'false' END AS psold,
        COUNT(*) AS 'likes'
	FROM user u, product_posts p, user_likes ul
	WHERE (u.uid = p.uid) and (p.postid = ul.postid)
	GROUP BY u.uid, u.first_name, u.last_name, p.postid, p.product_name, p.product_description, p.post_date, p.price
	UNION ALL
	SELECT p.postid, u.uid, CONCAT(u.first_name, ', ', u.last_name) AS 'name', p.product_name,
		CONCAT(SUBSTRING(p.product_description, 1, 30), '...') AS 'detail',
		DATE_FORMAT(p.post_date, "%M %d %Y") AS 'date', p.price, p.sold, CASE WHEN p.sold='1' THEN 'true' ELSE 'false' END AS psold,
        0 AS 'likes'
	FROM user u, product_posts p, user_likes ul
	WHERE (u.uid = p.uid) and (p.postid NOT IN (SELECT postid FROM user_likes))
	GROUP BY u.uid, u.first_name, u.last_name, p.postid, p.product_name, p.product_description, p.post_date, p.price;

CREATE OR REPLACE VIEW current_users AS
SELECT uid, first_name, last_name, birthdate
FROM user;

CREATE OR REPLACE VIEW current_posts
AS
SELECT postid, name, product_name, detail, date, price, likes FROM main_table WHERE sold='0';

CREATE OR REPLACE VIEW user_interested AS
SELECT DISTINCT u.uid, pt.tag_name
FROM user u, post_has_tag pt, user_likes ul
WHERE (u.uid = ul.uid) and (pt.postid = ul.postid);


-- test queries to check
select * from user;
select uid as "seller" from product_posts;
select * from advertisement a, ad_has_tag at where a.adid=at.adid;
select * from tag;
select * from product_posts p, post_has_tag pt where p.postid=pt.postid;
select * from user u, user_likes ul, product_posts p
where u.uid=ul.uid and ul.postid=p.postid;
select * from comment_authors order by commentdate desc;
select * from transaction_buys;
SELECT * FROM main_table;
SELECT * FROM current_posts;

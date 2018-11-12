-- Group 46
-- Gina hong i0l0b
-- Nicholas Chin p8d1b
-- Aleksei Feklisov y8v0b
-- Maximilian Was-Damji n6g1b

CREATE DATABASE IF NOT EXISTS MarketDB;
USE MarketDB;

-- DROP TABLE IF EXISTS post_likes;
DROP TABLE IF EXISTS transaction_buys;
DROP TABLE IF EXISTS comment_authors;
DROP TABLE IF EXISTS product_photo;
-- DROP TABLE IF EXISTS uses;
DROP TABLE IF EXISTS ad_has_tag;
DROP TABLE IF EXISTS post_has_tag;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS user_likes;
DROP TABLE IF EXISTS advertisement;
DROP TABLE IF EXISTS product_posts;
DROP TABLE IF EXISTS seller;
DROP TABLE IF EXISTS buyer;
DROP TABLE IF EXISTS user;

CREATE TABLE advertisement (
    adid INTEGER(8),
    adimage VARCHAR(500), -- image LINK
    adlink VARCHAR(500), -- if click on add, should link to
    PRIMARY KEY (adid)
);

/* changes to ERD made. No more entity post_likes
CREATE TABLE post_likes (
    likes_uid VARCHAR(30),
    likes_postid INTEGER(8),
    uid VARCHAR(30) NOT NULL,
    postid INTEGER(8) NOT NULL,
    PRIMARY KEY (likes_uid, likes_postid),
    FOREIGN KEY (uid) REFERENCES user (uid)
        ON DELETE CASCADE,
    FOREIGN KEY (postid) REFERENCES product_posts (postid)
        ON DELETE CASCADE
)
*/

CREATE TABLE user (
    uid VARCHAR(30) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    password VARCHAR(30) NOT NULL,
    birthdate DATE,
    PRIMARY KEY (uid)
);

CREATE TABLE seller (
    uid VARCHAR(30) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    password VARCHAR(30) NOT NULL,
    birthdate DATE,
    PRIMARY KEY (uid),
    FOREIGN KEY (uid) REFERENCES user (uid)
            ON DELETE NO ACTION
);

CREATE TABLE buyer (
    uid VARCHAR(30) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    password VARCHAR(30) NOT NULL,
    birthdate DATE,
    PRIMARY KEY (uid),
    FOREIGN KEY (uid) REFERENCES user (uid)
            ON DELETE NO ACTION
);

-- new sold attribute
CREATE TABLE product_posts (
    postid INTEGER(8),
    uid VARCHAR(30),
    product_description VARCHAR(1000),
    product_name VARCHAR(30),
    post_date DATE,
    price REAL,
    sold BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (postid),
    FOREIGN KEY (uid) REFERENCES seller (uid)
        ON DELETE CASCADE
);

CREATE TABLE transaction_buys (
    transactionid INTEGER(8),
    card_exp CHAR(4) NOT NULL,
    card_no CHAR(12) NOT NULL,
    card_name VARCHAR(20) NOT NULL,
    postid INTEGER(4) NOT NULL,
    uid VARCHAR(30) NOT NULL,
    PRIMARY KEY (transactionid),
    FOREIGN KEY (postid) REFERENCES product_posts (postid)
        ON DELETE NO ACTION, -- cant delete post if transaction
    FOREIGN KEY (uid) REFERENCES buyer (uid)
        ON DELETE NO ACTION -- cant delete user if transaction
);

CREATE TABLE comment_authors (
    commentid INTEGER(8),
    postid INTEGER(8),
    uid VARCHAR(30),
    commenttxt VARCHAR(500),
    commentdate DATE,
    edited BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (commentid, postid, uid),
    FOREIGN KEY (postid) REFERENCES product_posts (postid)
        ON DELETE CASCADE,
    FOREIGN KEY (uid) REFERENCES user (uid)
        ON DELETE CASCADE
);

CREATE TABLE product_photo (
    photoid INTEGER(4),
    postid INTEGER(8),
    photo_link VARCHAR(500), -- link to image
    PRIMARY KEY (photoid, postid),
    FOREIGN KEY (postid) REFERENCES product_posts (postid)
            ON DELETE CASCADE
);

/*
change to ERD, no longer need uses relationship
CREATE TABLE uses (
    postid INTEGER(8),
    uid VARCHAR(30),
    adid INTEGER(8),
    PRIMARY KEY (postid, uid, adid),
    FOREIGN KEY (postid) REFERENCES product_posts (postid),
    FOREIGN KEY (uid) REFERENCES user (uid),
    FOREIGN KEY (adid) REFERENCES advertisement (adid)
);
*/

-- below are the new entities and relationships
CREATE TABLE tag (
    tag_name VARCHAR(20),
    PRIMARY KEY (tag_name)
);

CREATE TABLE ad_has_tag (
    adid INTEGER(8),
    tag_name VARCHAR(20),
    PRIMARY KEY (adid, tag_name),
    FOREIGN KEY (adid) REFERENCES advertisement (adid)
            ON DELETE CASCADE,
    FOREIGN KEY (tag_name) REFERENCES tag (tag_name)
            ON DELETE CASCADE
);

CREATE TABLE post_has_tag (
    postid INTEGER(8),
    tag_name VARCHAR(20),
    PRIMARY KEY (postid, tag_name),
    FOREIGN KEY (postid) REFERENCES product_posts (postid)
            ON DELETE CASCADE,
    FOREIGN KEY (tag_name) REFERENCES tag (tag_name)
            ON DELETE CASCADE
);

CREATE TABLE user_likes (
    uid VARCHAR(30),
    postid INTEGER(8),
    PRIMARY KEY (uid, postid),
    FOREIGN KEY (uid) REFERENCES user (uid)
            ON DELETE CASCADE,
    FOREIGN KEY (postid) REFERENCES product_posts (postid)
            ON DELETE CASCADE
);

-- insert 6 users: u1 to u6. u2, u3, u4 are both buyer AND seller
INSERT INTO user
VALUES ('u1', 'Gina', 'Hong', 'p1', '1997-11-03');
INSERT INTO buyer
VALUES ('u1', 'Gina', 'Hong', 'p1', '1997-11-03');

INSERT INTO user
VALUES ('u2', 'Boat', 'Mcboat', 'p2', '2007-01-03');
INSERT INTO buyer
VALUES ('u2', 'Boat', 'Mcboat', 'p2', '2007-01-03');
INSERT INTO seller
VALUES ('u2', 'Boat', 'Mcboat', 'p2', '2007-01-03');

INSERT INTO user
VALUES ('u3', 'Tony', 'Stark', 'p3', '1971-09-23');
INSERT INTO seller
VALUES ('u3', 'Tony', 'Stark', 'p3', '1971-09-23');
INSERT INTO buyer
VALUES ('u3', 'Tony', 'Stark', 'p3', '1971-09-23');

INSERT INTO user
VALUES ('u4', 'Steph', 'Curry', 'p4', '1988-05-03');
INSERT INTO seller
VALUES ('u4', 'Steph', 'Curry', 'p4', '1988-05-03');
INSERT INTO buyer
VALUES ('u4', 'Steph', 'Curry', 'p4', '1988-05-03');

INSERT INTO user
VALUES ('u5', 'Kevin', 'Durant', 'p5', '1989-01-13');
INSERT INTO buyer
VALUES ('u5', 'Kevin', 'Durant', 'p5', '1989-01-13');

INSERT INTO user
VALUES ('u6', 'John', 'Mayer', 'p6', '1977-09-10');
INSERT INTO buyer
VALUES ('u6', 'John', 'Mayer', 'p6', '1977-09-10');


-- 4 advertisements. guitar, chef knife, warriors ticket, boat shop
INSERT INTO advertisement
VALUES ('00000001', 'ad_img1', 'electric guitar');

INSERT INTO advertisement
VALUES ('00000002', 'ad_img2', 'bargain mart');

INSERT INTO advertisement
VALUES ('00000003', 'ad_img3', 'warriors ticket');

INSERT INTO advertisement
VALUES ('00000004', 'ad_img4', 'boat shop');


-- 4 product posts.
INSERT INTO product_posts
VALUES ('00000001', 'u2', 'Beautiful boats with amenities inside. Looking to sell quick',
'Mcboatface Boat', '2018-11-08', 1899, 0);

INSERT INTO product_posts
VALUES ('00000002', 'u3', 'utilitiarian metal suit being sold for a bargain. broken during fight w/ friends. obo',
'ironman mkV', '2018-11-11', 1000, 0);

INSERT INTO product_posts
VALUES ('00000004', 'u3', 'red, white, and blue metal disc. Good for frisbee. Slightly damaged',
'used frisbee', '2018-11-11', 10, 0);

INSERT INTO product_posts
VALUES ('00000003', 'u4', 'Increase your range with these curry 4s',
'Curry 4s', '2017-09-28', 299, 0);


-- 4 tags: sports, electronic, boat, used
INSERT INTO tag
VALUES ('Sports');

INSERT INTO tag
VALUES ('Electronic');

INSERT INTO tag
VALUES ('Boat');

INSERT INTO tag
VALUES ('Used');

INSERT INTO post_has_tag
VALUES ('00000001', 'Boat');

INSERT INTO post_has_tag
VALUES ('00000002', 'Electronic');
INSERT INTO post_has_tag
VALUES ('00000002', 'Used');

INSERT INTO post_has_tag
VALUES ('00000004', 'Sports');
INSERT INTO post_has_tag
VALUES ('00000004', 'Used');

INSERT INTO post_has_tag
VALUES ('00000003', 'Sports');

-- elec guitar is 'Electronic' tag
INSERT INTO ad_has_tag
VALUES ('00000001', 'Electronic');

INSERT INTO ad_has_tag
VALUES ('00000002', 'Used');

INSERT INTO ad_has_tag
VALUES ('00000003', 'Sports');

INSERT INTO ad_has_tag
VALUES ('00000004', 'Boat');


-- need to add user_likes, comment_authors, and 1 transaction_buys

select * from user;
select * from advertisement a, ad_has_tag at where a.adid=at.adid;
select * from tag;
select * from product_posts p, post_has_tag pt where p.postid=pt.postid or
    p.postid NOT IN (select postid from post_has_tag);

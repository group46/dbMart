CREATE DATABASE IF NOT EXISTS 'Craigsbook';
USE 'Craigsbook';

DROP TABLE IF EXISTS 'advertisement';
DROP TABLE IF EXISTS 'post_likes';
DROP TABLE IF EXISTS 'user';
DROP TABLE IF EXISTS 'seller';
DROP TABLE IF EXISTS 'buyer';
DROP TABLE IF EXISTS 'transaction_has';
DROP TABLE IF EXISTS 'comment';
DROP TABLE IF EXISTS 'product_posts';
DROP TABLE IF EXISTS 'product_photo';
DROP TABLE IF EXISTS 'uses';

CREATE TABLE 'advertisement' (
    'aid' INTEGER,
    'adimage' VARCHAR(500), -- image LINK
    'adlink' VARCHAR(500), -- if click on add, should link to
    'adtag' VARCHAR(20),
    PRIMARY KEY (aid)
);

CREATE TABLE 'post_likes' (
    'likes_uid' VARCHAR(30),
    'likes_postid' INTEGER,
    'uid' VARCHAR(30),
    'postid' INTEGER,
    PRIMARY KEY (likes_uid, likes_postid),
    FOREIGN KEY (uid) REFERENCES user (uid),
    FOREIGN KEY (postid) REFERENCES product_posts (postid)
)

CREATE TABLE 'user' (
    'uid' VARCHAR(30) NOT NULL,
    'first_name' VARCHAR(20) NOT NULL,
    'last_name' VARCHAR(20) NOT NULL,
    'password' VARCHAR(30) NOT NULL,
    'birthdate' DATE CHECK (birthdate < now()::date),
    PRIMARY KEY (uid)
);

CREATE TABLE 'seller' (
    'uid' VARCHAR(30) NOT NULL,
    'first_name' VARCHAR(20) NOT NULL,
    'last_name' VARCHAR(20) NOT NULL,
    'password' VARCHAR(30) NOT NULL,
    'birthdate' DATE CHECK (birthdate < now()::date),
    PRIMARY KEY (uid),
    FOREIGN KEY (uid) REFERENCES user (uid)
);

CREATE TABLE 'buyer' (
    'uid' VARCHAR(30) NOT NULL,
    'first_name' VARCHAR(20) NOT NULL,
    'last_name' VARCHAR(20) NOT NULL,
    'password' VARCHAR(30) NOT NULL,
    'birthdate' DATE CHECK (birthdate < now()::date),
    PRIMARY KEY (uid),
    FOREIGN KEY (uid) REFERENCES user (uid)
);

CREATE TABLE 'transaction_has' (
    'transactionid' INTEGER,
    'card_exp' CHAR(4),
    'card_no' CHAR(12),
    'card_name' VARCHAR(20),
    'postid' INTEGER,
    'uid' VARCHAR(30),
    PRIMARY KEY (transactionid),
    FOREIGN KEY (postid) REFERENCES product_posts (postid),
    FOREIGN KEY (uid) REFERENCES buyer (uid)
);

CREATE TABLE 'comment' (
    'commentid' INTEGER,
    'postid' INTEGER,
    'uid' VARCHAR(30),
    'commenttxt' VARCHAR(500),
    'commentdate' DATE,
    'edited?' BOOLEAN,
    PRIMARY KEY (commentid, postid, uid),
    FOREIGN KEY (postid) REFERENCES product_posts (postid),
    FOREIGN KEY (uid) REFERENCES user (uid)
)

CREATE TABLE 'product_posts' (
    'postid' INTEGER,
    'uid' VARCHAR(30),
    'product_description' VARCHAR(1000),
    'product_name' VARCHAR(30),
    'post_date' DATE,
    'price' REAL,
    'tag' VARCHAR(20),
    PRIMARY KEY (postid),
    FOREIGN KEY (uid) REFERENCES user (uid)
);

CREATE TABLE 'product_photo' (
    'photoid' INTEGER,
    'postid' INTEGER,
    'photo_link' VARCHAR(500), -- link to image
    PRIMARY KEY (photoid, postid),
    FOREIGN KEY (postid) REFERENCES product_posts (postid)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

CREATE TABLE 'uses' (
    'postid' INTEGER,
    'uid' VARCHAR(30),
    'aid' INTEGER,
    PRIMARY KEY (postid, uid, aid),
    FOREIGN KEY (postid) REFERENCES product_posts (postid),
    FOREIGN KEY (uid) REFERENCES user (uid),
    FOREIGN KEY (aid) REFERENCES advertisement (aid)
);

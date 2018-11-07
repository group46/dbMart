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
    tag VARCHAR(20),
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
    uid INTEGER(30),
    postid INTEGER(8),
    PRIMARY KEY (uid, postid),
    FOREIGN KEY (uid) REFERENCES user (uid)
            ON DELETE CASCADE,
    FOREIGN KEY (postid) REFERENCES product_posts (postid)
            ON DELETE CASCADE
);

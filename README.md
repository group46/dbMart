# :tada: :dollar: Market Database :computer: :tada:

## Table of Content
PLEASE read the getting_started_git.txt! It might help you get set up.

[Phase 1 - Project Proposal](https://github.com/cpsc304-group46/cpsc304db/blob/master/README.md#1-project-proposal) | [Phase 2 - Logical Design](https://github.com/cpsc304-group46/cpsc304db/blob/master/README.md#2-logical-design)
------------ | -------------

### 1. Project Proposal
#### What is the domain of the application?

The domain of our application is a social media platform that focuses on allowing a marketplace, for users to buy and sell products. Users can bid for goods, leave comments, and search through the product tag to make a decision. Based on a user’s previous purchases, posts, comments, tags, and friends, our platform will recommend products to the user.

#### What aspects of the domain are modeled by the database?

Our platform will use a database to store users’ account details, previous transactions, ongoing sales, users’ posts and comments as well as post and transaction tags. Our platforms recommendation feature will query the database extensively to provide users with recommendations. Users can query the database for other users’ accounts, posts and comments as well as ongoing sales and past transactions.

#### Query
- Certain User’s ongoing sales / past transactions
- All sales of a certain item
- Which product would User be interested in? (recommendation)
- Show items of certain type that is within a certain price range

#### What benefit does the database provide to the application? / What functionality will the database provide?

With user accounts being created, transactions being recorded as well as users’ posts and comments being submitted concurrently, the platforms has many critical sections that are subject to dataraces. This issue caused by concurrent access to data can be resolved by a database management system.
Users of a platform cannot see the recommendations issued to another user, and recommendations will be unique to each user based on their activity patterns. A database management system can help prevent and enforce rules surrounding what user sees what…
Users can manually query for items on sale. A relational database allows users to write intuitive queries.


#### What platform will the final project be on? / What is your application technology stack?

For front end we will be using React.js. For backend we will be using Node.js Express web application framework. Our DBMS will be MySQL. We chose React and Node due to their wide range of online documentation/tutorials. Additionally, by using Javascript for both backend and frontend, we hoped that having one language to learn would help with speeding up development. We will host the website locally and we intend to use github for version control.


### 2. Logical Design
#### ER Diagram
The ER Diagram is the entity_relation_diagram.jpg and is also found in the cpsc304_coverpage_document.pdf

#### Relational Model, Functional Dependencies, and Normalization
Info about translating into relational model, the FDs, and the normalization are in the cpsc304_coverpage_document.pdf

#### SQL DDL Create Tables
See the project_phase2.sql

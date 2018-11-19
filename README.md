# :tada: :dollar: Market Database :computer: :tada:


### Preview of project (Nov 13th)
![screen shot 2018-11-18 at 6 15 32 pm](https://user-images.githubusercontent.com/32022159/48683024-f9ca3800-eb5f-11e8-8357-63900f7fa50c.png)


## Table of Content
### PLEASE read the Getting Started section below! It might help you get set up.

| Section Name  | Section Description |
| ------------- | ------------- |
| [0 - Getting Started](https://github.com/cpsc304-group46/cpsc304db/blob/master/README.md#0-Getting-Started)  | Quick guide on git and getting node.js set up for this app!  |
| [Phase 1 - Project Proposal](https://github.com/cpsc304-group46/cpsc304db/blob/master/README.md#1-project-proposal)  | Write up on our answers for phase1 of the project.  |
| [Phase 2 - Logical Design](https://github.com/cpsc304-group46/cpsc304db/blob/master/README.md#2-logical-design) | Write up on what we did for phase 2 of the project. |
| [Final Deliverables](https://github.com/cpsc304-group46/cpsc304db/blob/master/README.md#Final-Deliverables) | Short write up on which files are where, etc... |


## 0. Getting Started
### NODE Modules used are listed on package.json (see the dependencies):
 
 First install nodemon globally. This just makes running your app easier.
 
        npm install nodemon -g         //global install nodemon to run this app
        
then go to app.js and modify the 'username' and 'password' to run mysql **IMPORTANT
once all dependencies are installed and app.js modified, try this on terminal

        nodemon app.js
       
 If all node dependencies (listed in the package.json file) are installed, the app should run smoothly on localhost:5000!
 
### Loading the Database

 We used mysql to load the files. First,
        
        mysql -u username -p password
        
 Then do
 
        source /path/to/marketdb.sql     // Loads the database and tables. (Also 'drops' the tables. Useful for resetting data)
        
        source /path/to/populate_marketdb.sql    // Loads the sample users, posts, comments, ads, etc. of the project.
 

### Using git for project management
1. clone repo using:

        On terminal
        cd into whatever local directory you want these files to be stored at
        git clone https://github.com/cpsc304-group46/cpsc304db.git

2. Making changes / adding features

        git checkout -b branchname
            - before making any changes make a branch!
            - branchname could be featurename, etc...
        (then atom . or subl . to open in your text editor and edit!)

3. once change is made:

        git add .
            - adding changes to your branch
        git commit -m "messages/short description of what was done"
        git checkout master
            - switch branch to master
        git push origin branchname
            - pushing changes in branchname to master branch

4. Make [pull request on github](https://services.github.com/on-demand/github-cli/open-pull-request-github)

5. Once pull request is made, the branch will be merged with master branch after a review. Once branch merged w/ master branch, make sure to 1) update your local copy of master branch, and 2) delete the previous branch you made for the edit.
        
        git branch
            - to check you are in master branch
        git pull
        
        git branch -d branchname

6. now go back to step 2 and repeat! (git checkout -b newbranchname)
        
## 1. Project Proposal
### What is the domain of the application?

MarketDB (or DBMart) is a web application for users to buy and sell products. The current list of functionalities allows Users to create an account, add product posts, edit and delete posts, search for products in their price range, and see previous comments. 
Additionally, based on a user’s previous likes, our platform will be able to ‘match’ certain advertisements to that user.

### What aspects of the domain are modeled by the database?

Our platform will use a database to store users’ account details, previous transactions, ongoing sales, users’ posts and comments as well as post and transaction tags. Our platforms recommendation feature will query the database to provide users with recommendations. Users can query the database for other users’ accounts, posts and comments as well as ongoing sales.

### Query

|  **Category** | **General idea** | **detailed** |
|  ------ | ------ | ------ |
|  2-INSERT<br/>(REQ 1) | A. Add Post (N) | A user is able to add a post with a product he wants to sell. The postid is auto-generated user must type in a valid username/password combination.. |
|   | B. Add User (A) | A user creates an account. Insert new user info in to User table |
|   | F. Add Tag (N) | A user adds a tag to their product post. (“tag” field when adding post) |
|  3-DELETE<br/>(REQ 1) | A. Delete Post (N) | With the right username/password combination, you can delete a post. |
|  4-UPDATE<br/>(REQ 1) | A. Edit Post (N) | User can make changes to a post. (change description, product name) |
|   | B. Update account info (A) | User can update their account info (Not user_ID though) |
|  5-JOIN(3)(REQ 1) | A. linking users w/ advertisements they may be interested in. (G) | Query which user is interested in which advertisement + tag. JOINs advertisement, user, ad_has_tag, and user_interested(view).. |
|  6-JOIN(2)<br/>(REQ 1) | B. Comment with User first name, last name (M) | Displays user name with comment. JOIN user w/ comment_authors. |
|  7-GROUPBY<br/>(REQ 1) | A. Show product_post information (number of likes each post has). | This is the “main_table” that you see on the main page. (groupby, join(3), view, union). One column shows number of likes. |
|  8-GEN<br/>(SELECT) | User Verification in delete post (G) | Select query that searches for the user inputted uid and password values. Used in post deletion, where if the result of this query is empty, post cannot be deleted. |
|  9-GEN<br/>(SELECT) | Current_posts in price range (G) | Select query that searches for current_posts that are within a user specified price range. |
|  10-GEN | Select from the extra SQLs in Insert (B and F) |  |
|  11-VIEW<br/>(REQ 1) | A. Current product post (G) | Create view current_posts where posts are not marked as sold. (used to SELECT posts in certain price point). |
|   | B. User_interested (G) | Create view that joins user, post_has_tag, and user_likes. It shows which tags a user is interested in based on their likes history. Used for the Join(3) query (linking users with advertisements). |
|  12-<br/>DIVISION | A.Get post that all users liked |  |

### What benefit does the database provide to the application? / What functionality will the database provide?

With user accounts being created, transactions being recorded as well as users’ posts and comments being submitted concurrently, the platforms has many critical sections that are subject to dataraces. This issue caused by concurrent access to data can be resolved by a database management system.
Users of a platform cannot see the recommendations issued to another user, and recommendations will be unique to each user based on their activity patterns. A database management system can help prevent and enforce rules surrounding what user sees what…
Users can manually query for items on sale. A relational database allows users to write intuitive queries.


### What platform will the final project be on? / What is your application technology stack?

For front end we will be using React.js. For backend we will be using Node.js Express web application framework. Our DBMS will be MySQL. We chose React and Node due to their wide range of online documentation/tutorials. Additionally, by using Javascript for both backend and frontend, we hoped that having one language to learn would help with speeding up development. We will host the website locally and we intend to use github for version control.


## 2. Logical Design
### ER Diagram
The ER Diagram is the entity_relation_diagram.jpg and is also found in the cpsc304_coverpage_document.pdf

### Relational Model, Functional Dependencies, and Normalization
Info about translating into relational model, the FDs, and the normalization are in the cpsc304_coverpage_document.pdf

### SQL DDL Create Tables
See the /db folder's marketdb.sql

## Final Deliverables
![screen shot 2018-11-18 at 6 15 32 pm](https://user-images.githubusercontent.com/32022159/48683024-f9ca3800-eb5f-11e8-8357-63900f7fa50c.png)
### Screenshots
Sample shots of what our app looks like is located in the /screenshots folder.

### READ_project_documentation
This folder contains the coverpage (CPSC304 Cover Page and Details.pdf), the FINAL ER diagram, and all our previous submissions(in the prev_phase folder).




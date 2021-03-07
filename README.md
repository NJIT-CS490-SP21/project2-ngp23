# Project2-milestone_1

# Tic Tac Toe

# Login username for the player
## Player 1= user1
## Player 2= user2
    
## Technology Used in this Milestone
  - We use the cloud 9 services on aws to priview and make updates on the file.

## Framework 
  - Frame work we used was react js and flask.

## languages we used for coding M1 Python, HTML, CSS, reactJs

## User will need to install all the require libraries in order for project to work using the code bellow
  - `npm install`
  - `pip install -r requirements.txt`
  - `pip install flask_socketio`
  - `pip install flask_cors`
  - `pip install Flask-SQLAlchemy==2.1`
  - `pip install psycopg2-binary`

## setup
  - Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Database setup
  - Install PostGreSQL: `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs` Enter yes to all prompts. 
  - Initialize PSQL database: `sudo service postgresql initdb`
  - Start PSQL: `sudo service postgresql start`
  - Make a new superuser: `sudo -u postgres createuser --superuser $USER`
  - Make a new database: `sudo -u postgres createdb $USER`
  - sql.env file with the format `SQL_USER= and SQL_PASSWORD=`
  

## Initialize the database
  - See the config vars set by Heroku for you: `heroku config`
  - Set the value of DATABASE_URL as an environment variable by entering this in the terminal: `export DATABASE_URL='copy-paste-value-in-here'`
  - type `python` in the project directory
  - `>>> from app import db`
  - `>>> import models`
  - `>>> db.create_all()``
  - `admin = models.Person(username='admin', score = 100)`
  - `db.session.add(admin)`
  - `db.session.commit()`

## How to run the APP on the computer
 - cd into the directory
 - run `python app.py`
 - open new terminal 
 - cd into project directory
 - run `npm run start`
 - then preview the web page in browser '/'

## Libraries needed to import for Milestone1
  - socket.io
  - Flask_Session
  - flask_socket.io
  - reactJs

## Deploy to Heroku
 - Create a free account on heroku https://singup.heroku.com/login
 - Create an text file in directory called requirements.txt
 - Run the line of code in terminal in directory  `pip freeze > requirements.txt`  This will add all the needed libraries in the requirements.txt file.
 - If for some reason the code above doesnt work then you can always run the command `[pip freeze]` in terminal it will list out all the libraries used for the directory. Just copy those libraies in `requirements.txt` file.
 - Now create another file call Procfile in the same directory. Add `web: python app.py` in the `Procfile`.
 - Once done with previous steps makes sure to do `git add -A` and `git commit -m "text"` to commit all the changes to git repo.
 - Now login to heroku account from terminal using the `heroku login -i`
 - Now create an new app to deploy `heroku create --buildpack heroku/python`
 - Now add the addons for datbase heroku `heroku addons:create heroku-postgresql:hobby-dev`
 - If finish all the previous steps follow the section **Initialize the database**.
 - Now we need to create buildpacks run `heroku buildpacks:add --index 1 heroku/nodejs`
 - do `git push heroku milestone_2:main` what is does is that it will push you repo to the heroku's repo.
 - once its push you can do `heroku open` which will give you link to open the application.
 - Now app should open without any problem.

## What are at least 2 technical issues encountered with your prject? how did you fix them?
 - One of the technical issue I faced for this milestone was not being able to upload the app to heroku properly. 
        To fix this I redeployed the app using the steps in heroku deployment.
 - Another technical issue I faced for this milestone was was not being able to update the leaderboard for whoever's turn it was.
       To fix this problem I ended up having to google socket.emit libraies where I got reference to stackover flow where someone
       was having same issue. To fix this problem I had to remove `include_self=False` from the socket.emit statement in app.py. 
       They explained it by saying that when you have that argument in emit statement it updates for every user but the current user.


## What are known problem (Still existing), if any, with your project?
  - If any player leaves the game it wouldnt reset the player names. If I had extra time I would have added a logout button so that it resets the players.
  - Other known problem would be that there could be multiple players with the same name in the list which can cause confusion while giving an access. To fix this I would have created an some sort of an dictionary or list which avoids duplicate.
  - The database only allows 20 connections which can cause too many connections error if the user passes the connection limit. To fix problem add the log out button which will destroy the connections which is not used also we can upgrade the membership.
 

## What would you do to improve you project in the future?
 - In project I would like to add the logout button so that any player wants to leave the game they can just press logout button and take out the player from the list and add spec to player list.
 - Another imporovement I would like to make for this project is create rooms so that only people you share your room code can play with you.
 - I would also like to add a computer game where if there is no player two user can play with computer.
 
 
 


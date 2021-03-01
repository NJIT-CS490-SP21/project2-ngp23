# Project2-milestone_1

# Tic Tac Toe
## Technology Used in this Milestone
  - We use the cloud 9 services on aws to priview and make updates on the file.

## Framework 
  - Frame work we used was react js and flask.

## languages we used for coding M1 Python, HTML, CSS, reactJs

## User will need to install all the require libraries in order for project to work using the code bellow
  - npm install
  - pip install -r requirements.txt
  - pip install flask_socketio
  - pip install flask_cors

## setup
  - Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

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
 - once the app is created it will give print out url in the terminal where heroku will deploy the appications.
 - Now we need to create buildpacks run `heroku buildpacks:add --index 1 heroku/nodejs`
 - do `git push heroku main:milestone_1` what is does is that it will push you repo to the heroku's repo.
 - once its push you can do `heroku open` which will give you link to open the application.
 - Now app should open without any problem.

## What are at least 3 technical issues encountered with your prject? how did you fix them?
 - The technical issues I encountered with the project was while uploading to heroku. Heroku wasn't able to notice the Flask_SocketIO requirement from txt file. To fix this problem I run the command `pip install flask-socketio` in terminal. Was able to fix this problem from the slack channel.
 - Another problem I faced for this project was `pip freeze > requirements.txt` wasn’t adding all the needed libraries to the txt file which caused and error while uploading to the heroku. To fix the issue I had to run `pip freeze` in terminal and copy all the requirements and past it in `requirements.txt` figured out on own
 - There was glitch in AWS time to time which will prevent me from applying new changes. To fix this I had to restart the AWS instance.
 - Few other issues I encourtered were connected with the reactjs where I was getting error map undefine and error with the socket IO which I was able to fix it with the help of the Google.
 - Was having Issue with the draw function which I was able to fix it with the help of stack overflow.

## What are known problem (Still existing), if any, with your project?
  - If any player leaves the game it wouldnt reset the player names. If had an extra time would have add logout button so that it resets the players.
  - Other known problem would be that there could be multiple players with the same name in the list which can cause confusion while giving an access. To fix this I would have created an some sort of an dictionary or list which avoids duplicate.

## What would you do to improve you project in the future?
 - In project I would like to add the logout button so that any player wants to leave the game they can just press logout button and take out the player from the list and add spec to player list.
 - Another imporovement I would like to make for this project is create rooms so that only people you share your room code can play with you.
 - I would also like to add a computer game where if there is no player two user can play with computer.
 
 
 


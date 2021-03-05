import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv()) # This is to load your env variables from .env

app = Flask(__name__, static_folder='./build/static')
# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
import models
db.create_all()


cors = CORS(app, resources={r"/*": {"origins": "*"}})

userList=[]
userNames = {}


socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')
    all_people = models.Person.query.all()
    users = []
    for person in all_people:
        users.append(person.username)
    print(users)
    socketio.emit('user_list', {'users': users})


# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('chat')
def on_chat(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('chat',  data, broadcast=True, include_self=False)
@socketio.on('click')
def on_click(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('click', data, broadcast=True, include_self=False)
@socketio.on('reset')
def on_reset(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('reset', data, broadcast=True, include_self=False)
#helper function
def addToDb(data): # data is whatever arg you pass in your emit call on client
    check = models.Person.query.filter_by(username=data["setUser"],score=100).first()
    
    if(check==None):
        new_user = models.Person(username=data['setUser'], score=100)
        print(str(data))
        db.session.add(new_user)
        db.session.commit()
        all_people = models.Person.query.all()
        users = []
        for person in all_people:
            users.append(person.username)
   
def scoreBoard():
    scoreDict={}
    score=models.Person.query.order_by(models.Person.score).all()
    for s in score:
        scoreDict[s.username]=s.score
    print("score",scoreDict)
    return scoreDict

@socketio.on('leaderboard')
def leaderboard():
    score=scoreBoard()
    socketio.emit('leaderboard', score, broadcast=True, include_self=False)

@socketio.on('login')
def on_login(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    addToDb(data)
    if "X" not in userNames:
        userNames["X"] = data["setUser"]
    elif "O" not in userNames:
        userNames["O"] = data["setUser"]
    else:
        userList.append(data["setUser"])
        userNames["spec"]=userList
    print(userNames)
    socketio.emit('login', userNames, broadcast=True, include_self=False)
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    #socketio.emit('login', userList, broadcast=True, include_self=False)

# Note we need to add this line so we can import app in the python shell
@socketio.on('resetStats')
def resetStats(data):
    winner = data["setWin"]
    loser = data["setLose"]
    print(winner)
    print(loser)
    db.session.query(models)\
       .filter(models.Person.username == winner)\
       .update({models.Person.money: models.Person.score + 1})
    db.session.query(models)\
       .filter(models.Person.username == loser)\
       .update({models.Person.money: models.Person.score - 1})
    db.session.commit()
    
if __name__ == "__main__":
# Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )



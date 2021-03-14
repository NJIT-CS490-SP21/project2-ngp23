'''Server side of the app'''
import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())  # This is to load your env variables from .env

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

USERLIST = []
USERNAMES = {}

socketio = SocketIO(app,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)


@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    ''' index function with file name '''
    return send_from_directory('./build', filename)


# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    ''' function exicutes upon connection with client'''
    print('User connected!')
    all_people = models.Person.query.all()
    users = []
    for person in all_people:
        users.append(person.username)
    print(users)
    socketio.emit('USERLIST', {'users': users})


# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    ''' function exicutes upon disconnect with client'''
    print('User disconnected!')


# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('chat')
def on_chat(data):  # data is whatever arg you pass in your emit call on client
    '''Socket listen for the chat event and if
       any event occurs it will emit to the client back '''
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('chat', data, broadcast=True, include_self=False)


@socketio.on('click')
def on_click(
        data):  # data is whatever arg you pass in your emit call on client
    '''Listens for click event which updates the board
     if the event occurs it emits back to the client'''
    print(str(data))
    # This emits the 'click' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('click', data, broadcast=True, include_self=False)


@socketio.on('reset')
def on_reset(data):  # data is whatever arg you pass in your emit call on client
    '''Event listner for reset function for the board'''
    print(str(data))
    # This emits the 'reset' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('reset', data, broadcast=True, include_self=False)

def reset(data):
    return data

#helper function
def add_db(data):  # data is whatever arg you pass in your emit call on client
    '''functions checks for the data in DB and if not in Db then add to db'''
    check = models.Person.query.filter_by(username=data["setUser"]).first()
    print(check)
    if check is None:
        new_user = models.Person(username=data["setUser"], score=100)
        print(new_user)
        db.session.add(new_user)
        db.session.commit()


def score_board():
    ''' functions gets all the players and score from DB and store in list of Dict'''
    score_dict = []
    score_people = models.Person.query.order_by(
        models.Person.score.desc()).all()
    for score in score_people:
        score_dict.append({score.username: score.score})
    #sorted_d=dict(sorted(scoreDict.items(),key=operator.itemgetter(1),reverse=True))
    print("score", score_dict)
    return score_dict


@socketio.on('login')
def on_login(
        data):  # data is whatever arg you pass in your emit call on client
    '''Functions listens for login event and asigns the X, O and spec'''
    print("User loggedin", str(data))
    add_db(data)
    if "X" not in USERNAMES:
        USERNAMES["X"] = data["setUser"]
    elif "O" not in USERNAMES:
        USERNAMES["O"] = data["setUser"]
    else:
        USERLIST.append(data["setUser"])
        USERNAMES["spec"] = USERLIST
    print(USERNAMES)
    score = score_board()
    socketio.emit('resetStats', score, broadcast=True, include_self=False)
    socketio.emit('login', USERNAMES, broadcast=True, include_self=False)

def login(data):
    if "X" not in USERNAMES:
        USERNAMES["X"] = data["setUser"]
    elif "O" not in USERNAMES:
        USERNAMES["O"] = data["setUser"]
    elif data["setUser"] not in (USERLIST,USERNAMES['X'],USERNAMES['O']):
        USERLIST.append(data["setUser"])
        USERNAMES["spec"] = USERLIST
    return USERNAMES

# Note we need to add this line so we can import app in the python shell
@socketio.on('resetStats')
def reset_stats(data):
    '''Resets the data after ever game'''
    winner = data["setWin"]
    loser = data["setLose"]
    db.session.query(models.Person)\
       .filter(models.Person.username == winner)\
       .update({models.Person.score: models.Person.score + 1})
    db.session.query(models.Person)\
       .filter(models.Person.username == loser)\
       .update({models.Person.score: models.Person.score - 1})
    db.session.commit()
    score = score_board()
    print(score)
    socketio.emit('resetStats', score, broadcast=True)


if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )

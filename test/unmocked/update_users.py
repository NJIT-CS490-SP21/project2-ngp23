# users = {
#     'player_x': None,
#     'player_o': None,
#     'spectators': [],
# }

def add_user(username, users):
    if users['player_x'] == None:
        users['player_x'] = username
    elif users['player_o'] == None:
        users['player_o'] = username
    else:
        users['spectators'].append(username)
    
    return users
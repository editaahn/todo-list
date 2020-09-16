db = {
    'user'     : 'todo-rita',		# 1)
    'password' : 'rita10',		# 2)
    'host'     : 'localhost',	# 3)
    'port'     : 3306,			# 4)
    'database' : 'todo_list'		# 5)
}

DB_URL = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"

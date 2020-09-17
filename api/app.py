from flask import Flask, request, jsonify, current_app
from sqlalchemy import create_engine, text
from sqlStatement import *
from datetime import datetime

def create_app(test_config=None):  # 1)
    app = Flask(__name__)

    # app.json_encoder = CustomJSONEncoder

    if test_config is None:  # 2)
        app.config.from_pyfile("config.py")
    else:
        app.config.update(test_config)
    database = create_engine(
        app.config['DB_URL'], encoding='utf-8', max_overflow=0)  # 3)
    app.database = database  # 4)

    @app.route('/todo-list/all', methods=['GET'])
    def send_todo_list():
        rows_manager = app.database.execute(
            getAllManager__execute(), 
            {}
        ).fetchall()

        rows_todo = app.database.execute(
            getAllTodo__execute(), 
            {}
        ).fetchall()

        data = {'managers': [], 'todos': []}

        for row in rows_manager:
            data['managers'].append({
                'manager_id': row.manager_id,
                'name': row.name,
            })
        for row in rows_todo:
            data['todos'].append({
                'manager_id': row.manager_id,
                'todo_id': row.todo_id,
                'content': row.content,
            })

        return jsonify(data)

    @app.route('/todo-list/manager/name', methods=['PUT'])
    def set_manager_name():
        renamed_manager = request.json
        
        row = app.database.execute(
            setManagerName__execute(), 
            renamed_manager
        ).lastrowid

        result = current_app.database.execute(
            setManagerName__result(),
            {'id': renamed_manager['manager_id']}
        ).fetchone()

        return jsonify({
            'manager_id': result.manager_id, 
            'name': result.name, 
        }) if result else None

    @app.route('/todo-list/todo', methods=['POST'])
    def add_todo():
        new_todo = request.json

        new_todo_id = app.database.execute(
            add__execute(), 
            new_todo
        ).lastrowid

        result = current_app.database.execute(
            add__result(),
            {'id':new_todo_id}
        ).fetchone()

        if result:
            app.database.execute(
                add__history(), {
                    'date': datetime.now(), 
                    'todo_id': result.todo_id, 
                    'current_manager_id': result.manager_id
                })
            return jsonify({
                'todo_id': result.todo_id, 
                'manager_id': result.manager_id, 
                'content': result.content, 
            })

    @app.route('/todo-list/todo/<id>', methods=['DELETE'])
    def delete_todo(id):
        app.database.execute(delete__execute(), {'id': int(id)})

        result = current_app.database.execute(
            delete__result(), 
            {'id': int(id)}
        ).fetchone()

        if result:
            app.database.execute(
                delete__history(), {
                    'date': datetime.now(), 
                    'todo_id': result.todo_id, 
                    'prev_manager_id': result.manager_id
                })
            return jsonify({
                'todo_id': result.todo_id,
                'manager_id': result.manager_id,
            })

    @app.route('/todo-list/todo/new-manager', methods=['PUT'])
    def move_todo():
        new_todo = request.json

        app.database.execute(
            move__execute(), {
            'id': new_todo['todo_id'], 
            'manager_id': new_todo['current_manager_id']
        })

        result = current_app.database.execute(
            move__result(), 
            {'id': new_todo['todo_id']}
        ).fetchone()

        if result:
            app.database.execute(
                move__history(), {
                    'date': datetime.now(), 
                    'todo_id': result.todo_id, 
                    'prev_manager_id': new_todo['prev_manager_id'],
                    'current_manager_id': result.manager_id,
                })
            return jsonify({
                'todo_id': result.todo_id, 
                'manager_id': result.manager_id,
                'content': result.content, 
            }) 


    @app.route('/todo-list/todo', methods=['PUT'])
    def edit_todo():
        todo = request.json

        app.database.execute(
            edit__execute(), 
            {'id': todo['todo_id'], 'content': todo['content']}
        )

        result = current_app.database.execute(
            edit__result(), 
            {'id': todo['todo_id']}
        ).fetchone()

        if result:
            app.database.execute(
                edit__history(), {
                    'date': datetime.now(), 
                    'todo_id': result.todo_id, 
                    'prev_manager_id': result.manager_id
                })
            return jsonify({
                'todo_id': result.todo_id, 
                'manager_id': result.manager_id,
                'content': result.content, 
            }) 

    return app  # 5)


create_app()

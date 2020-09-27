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

    # 전체 manager / todo / history 내려주기
    @app.route('/todo-list/all', methods=['GET'])
    def send_todo_list():

        rows_manager = app.database.execute(getAllManager__execute()).fetchall()
        rows_todo = app.database.execute(getAllTodo__execute()).fetchall()
        rows_history = app.database.execute(getAllHistory__execute()).fetchall()

        data = {'managers': [], 'todos': [], 'history': []}

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

        for row in rows_history:
            data['history'].append({
                'history_id': row.history_id,
                'type': row.type,
                'prev_manager_id': row.prev_manager_id,
                'manager_id': row.manager_id,
                'todo_id': row.todo_id,
                'content': row.content,
                'date': row.date
            })

        return jsonify(data)

    # manager 이름 변경
    @app.route('/todo-list/manager/name', methods=['PUT'])
    def set_manager_name():
        renamed_manager = request.json
        
        app.database.execute(setManagerName__execute(), renamed_manager)

        result = current_app.database.execute(
            setManagerName__result(),
            {'id': renamed_manager['manager_id']}
        ).fetchone()

        return jsonify({
            'manager_id': result.manager_id, 
            'name': result.name, 
        }) if result else None

    # todo를 변경하는 모든 사용자 액션 4가지 (FE에서 DB 요청) --> DB저장 --> result 응답
    @app.route('/todo-list/todo', methods=['POST'])
    def add_todo():
        new_todo = request.json

        new_todo_id = app.database.execute(
            add__execute(), 
            new_todo
        ).lastrowid

        history_id = app.database.execute(
            add__history(), {
                'todo_id': new_todo_id,
                'manager_id': new_todo['manager_id']
        }).lastrowid

        result = current_app.database.execute(
            todo__result(),
            {'id':new_todo_id, 'history_id': history_id}
        ).fetchone()

        return jsonify({
            'todo': {
                'todo_id': result.todo_id, 
                'manager_id': result.manager_id, 
                'content': result.content,
            },
            'history': {
                'type': result.type,
                'date': result.date,
            }
        }) if result else None

    @app.route('/todo-list/todo/<id>', methods=['DELETE'])
    def delete_todo(id):
        app.database.execute(delete__execute(), {'id': int(id)})

        history_id = app.database.execute(
            delete__history(),
            {'todo_id': id}
        ).lastrowid

        result = current_app.database.execute(
            todo__result(), 
            {'id': int(id), 'history_id': history_id}
        ).fetchone()

        return jsonify({
            'todo': {
                'todo_id': result.todo_id,
                'content': result.content,
            },
            'history': {
                'type': result.type,
                'date': result.date,
                'prev_manager_id': result.manager_id,
            }
        }) if result else None

    @app.route('/todo-list/todo/new-manager', methods=['PUT'])
    def move_todo():
        moved_todo = request.json

        app.database.execute(
            move__execute(), {
            'id': moved_todo['todo_id'], 
            'manager_id': moved_todo['manager_id']
        })

        history_id = app.database.execute(
            move__history(), {
                'todo_id': moved_todo['todo_id'],
                'prev_manager_id': moved_todo['prev_manager_id'],
                'manager_id': moved_todo['manager_id']
        }).lastrowid

        result = current_app.database.execute(
            todo__result(), 
            {'id': moved_todo['todo_id'], 'history_id': history_id}
        ).fetchone()

        return jsonify({
            'todo': {
                'todo_id': result.todo_id, 
                'manager_id': result.manager_id,
                'content': result.content, 
            },
            'history': {
                'type': result.type,
                'date': result.date,
                'prev_manager_id': result.prev_manager_id,
            },
            'index': int(moved_todo['index'])
        }) if result else None

    @app.route('/todo-list/todo', methods=['PUT'])
    def edit_todo():
        todo = request.json

        app.database.execute(
            edit__execute(), 
            {'id': todo['todo_id'], 'content': todo['content']}
        )

        history_id = app.database.execute(
            edit__history(), {
                'todo_id': todo['todo_id']
        }).lastrowid

        result = current_app.database.execute(
            todo__result(), 
            {'id': todo['todo_id'], 'history_id': history_id}
        ).fetchone()

        return jsonify({
            'todo': {
                'todo_id': result.todo_id, 
                'manager_id': result.manager_id,
                'content': result.content, 
            },
            'history': {
                'type': result.type,
                'date': result.date,
        }
        }) 

    return app  # 5)


create_app()

from flask import Flask, request, jsonify, current_app
from sqlalchemy import create_engine, text
from sqlStatement import *
from datetime import datetime

def create_app(test_config=None):  # 1)
    app = Flask(__name__, static_folder='../build', static_url_path='/')

    # app.json_encoder = CustomJSONEncoder

    if test_config is None:  # 2)
        app.config.from_pyfile("config.py")
    else:
        app.config.update(test_config)
    database = create_engine(
        app.config['DB_URL'], encoding='utf-8', max_overflow=0)  # 3)
    app.database = database  # 4)

    @app.route('/')
    def index():
        return app.send_static_file('index.html')

    # 전체 manager / todo / history / order 내려주기
    @app.route('/todo-list/all', methods=['GET'])
    def send_todo_list():

        rows_manager = app.database.execute(getAllManager__execute()).fetchall()
        rows_todo = app.database.execute(getAllTodo__execute()).fetchall()
        rows_history = app.database.execute(getAllHistory__execute()).fetchall()
        rows_order = app.database.execute(getAllOrder__execute()).fetchall()

        data = {'managers': [], 'todos': [], 'histories': [], 'orders': {}}

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
            data['histories'].append({
                'history_id': row.history_id,
                'type': row.type,
                'prev_manager_id': row.prev_manager_id,
                'manager_id': row.manager_id,
                'todo_id': row.todo_id,
                'content': row.content,
                'date': row.date
            })

        for row in rows_order:
            data['orders'][row.manager_id] = [int (i) for i in row.order_list.split(',')] if row.order_list else []

        return jsonify(data)

    # manager 추가
    @app.route('/todo-list/manager/new-manager', methods=['POST'])
    def add_manager():
        new_manager = request.json

        new_manager_id = app.database.execute(addManager__execute(), new_manager).lastrowid
        app.database.execute(addManager__order(), {'id': new_manager_id})

        result = current_app.database.execute(
            addManager__result(),
            {'id': new_manager_id}
        ).fetchone()
        
        return jsonify({
            'manager_id': result.manager_id, 
            'name': result.name, 
        }) if result else None

    
    # manager 삭제
    @app.route('/todo-list/manager/deleted-manager', methods=['POST'])
    def delete_manager():
        deleted_manager = request.json

        app.database.execute(deleteManager__execute(), deleted_manager)

        result = current_app.database.execute(
            deleteManager__result(),
            {'id': deleted_manager['manager_id']}
        ).fetchone()
        
        return jsonify({
            'manager_id': result.manager_id,
        }) if result else None

    # manager 이름 변경
    @app.route('/todo-list/manager/name', methods=['POST'])
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
    @app.route('/todo-list/todo/new-todo', methods=['POST'])
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

        app.database.execute(
            todo__order(), {
                'manager_id': new_todo['manager_id'],
                'order': str(new_todo_id) + ',' + str(new_todo['order']) if new_todo['order'] else str(new_todo_id)
            }
        )

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
                'history_id': result.history_id,
                'type': result.type,
                'date': result.date,
            },
            'order': [int (i) for i in result.order_list.split(',')]
        }) if result else None

    @app.route('/todo-list/todo/deleted-todo', methods=['POST'])
    def delete_todo():
        deleted_todo = request.json
        
        app.database.execute(delete__execute(), {'id': deleted_todo['todo_id']})

        history_id = app.database.execute(
            delete__history(),
            {'todo_id': deleted_todo['todo_id']}
        ).lastrowid

        app.database.execute(
            todo__order(), {
                'manager_id': deleted_todo['manager_id'],
                'order': deleted_todo['order']
            }
        )

        result = current_app.database.execute(
            todo__result(), 
            {'id': deleted_todo['todo_id'], 'history_id': history_id}
        ).fetchone()

        return jsonify({
            'todo': {
                'todo_id': result.todo_id,
                'content': result.content,
            },
            'history': {
                'history_id': result.history_id,
                'type': result.type,
                'date': result.date,
                'prev_manager_id': result.manager_id,
            },
            'order': [int (i) for i in result.order_list.split(',')] if result.order_list else []
        }) if result else None

    @app.route('/todo-list/todo/moved-todo', methods=['POST'])
    def move_todo():
        moved_todo = request.json

        app.database.execute(
            move__execute(), {
            'id': moved_todo['todo_id'], 
            'manager_id': moved_todo['curr_manager_id']
        })

        history_id = app.database.execute(
            move__history(), {
                'todo_id': moved_todo['todo_id'],
                'prev_manager_id': moved_todo['prev_manager_id'],
                'manager_id': moved_todo['curr_manager_id']
        }).lastrowid

        app.database.execute(
            todo__order(), {
                'manager_id': moved_todo['prev_manager_id'],
                'order': moved_todo['prev_manager_order']
        })
        app.database.execute(
            todo__order(), {
                'manager_id': moved_todo['curr_manager_id'],
                'order': moved_todo['curr_manager_order']
        })

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
                'history_id': result.history_id,
                'type': result.type,
                'date': result.date,
                'prev_manager_id': result.prev_manager_id,
            },
            'orders' : {
                'curr_manager_order': [int (i) for i in result.order_list.split(',')],
                'prev_manager_order': [int (i) for i in moved_todo['prev_manager_order'].split(',')] if moved_todo['prev_manager_order'] else [],
            }
        }) if result else None

    @app.route('/todo-list/todo/edited-todo', methods=['POST'])
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
                'history_id': result.history_id,
                'type': result.type,
                'date': result.date,
            }
        }) 

    if __name__ == '__main__':  
        app.run('0.0.0.0', port=5000, debug=True)

    return app  # 5)


create_app()

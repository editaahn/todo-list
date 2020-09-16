from flask import Flask, request, jsonify, current_app
from sqlalchemy import create_engine, text


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
        rows_manager = app.database.execute(text("""			# 1)
                SELECT *
                FROM todo_manager
            """), {}).fetchall()

        rows_todo = app.database.execute(text("""			# 1)
                SELECT *
                FROM todo
                WHERE deleted = 0
            """), {}).fetchall()

        data = {'managers': [], 'todos': []}

        for row in rows_manager:
            data['managers'].append({
                'manager_id': row.manager_id,
                'name': row.name,
                'deleted': row.deleted
            })
        for row in rows_todo:
            data['todos'].append({
                'manager_id': row.manager_id,
                'todo_id': row.todo_id,
                'content': row.content,
                'deleted': row.deleted
            })

        return jsonify(data)

    @app.route('/todo-list/manager/name', methods=['PUT'])
    def set_manager_name():
        manager = request.json
        print(manager)
        row = app.database.execute(text("""	
            UPDATE todo_manager
            SET name = :name
            WHERE manager_id = :manager_id
        """), {'name': manager['name'], 'manager_id': manager['manager_id']}).lastrowid

        result = current_app.database.execute(text("""
            SELECT *
            FROM todo_manager
            WHERE manager_id = :id
        """), {
            'id': manager['manager_id']
        }).fetchone()

        return jsonify({'manager_id': result.manager_id, 'name': result.name, 'deleted': 0}) if result else None

    @app.route('/todo-list/todo', methods=['POST'])
    def add_todo():
        new_todo = request.json

        new_todo_id = app.database.execute(text("""	
            INSERT INTO todo(
                manager_id,
                content,
                deleted
            ) VALUES (
                :manager_id,
                :content,
                0
            )
        """), new_todo).lastrowid

        result = current_app.database.execute(text("""
            SELECT *
            FROM todo
            WHERE todo_id = :id
        """), {'id':new_todo_id}).fetchone()

        return jsonify({
            'todo_id': result.todo_id, 
            'manager_id': result.manager_id, 
            'content': result.content, 
            'deleted': 0
        }) if result else None

    @app.route('/todo-list/todo/<id>', methods=['DELETE'])
    def delete_todo(id):

        app.database.execute(text("""	
            UPDATE todo
            SET deleted = 1
            WHERE todo_id = :id
        """), {'id': int(id)})

        result = current_app.database.execute(text("""
            SELECT todo_id, deleted
            FROM todo
            WHERE todo_id = :id
            AND deleted = 1
        """), {'id': int(id)}).fetchone()

        return jsonify({
            'todo_id': result.todo_id,
            'deleted': result.deleted
        }) if result else None

    @app.route('/todo-list/todo', methods=['PUT'])
    def edit_todo():
        todo = request.json

        row = app.database.execute(text("""	
            UPDATE todo
            SET content = :content
            WHERE todo_id = :id
        """), { 'id': todo['todo_id'], 'content': todo['content']}).lastrowid

        result = current_app.database.execute(text("""
            SELECT *
            FROM todo
            WHERE todo_id = :id
        """), {
            'id': todo['todo_id']
        }).fetchone()

        return jsonify({
            'todo_id': result.todo_id, 
            'manager_id': result.manager_id,
            'content': result.content, 
            'deleted': 0
        }) if result else None

    @app.route('/todo-list/todo/new-manager', methods=['PUT'])
    def move_todo():
        todo = request.json

        row = app.database.execute(text("""	
            UPDATE todo
            SET manager_id = :manager_id
            WHERE todo_id = :id
        """), { 'id': todo['todo_id'], 'manager_id': todo['manager_id'] }).lastrowid

        result = current_app.database.execute(text("""
            SELECT *
            FROM todo
            WHERE todo_id = :id
        """), {
            'id': todo['todo_id']
        }).fetchone()

        return jsonify({
            'todo_id': result.todo_id, 
            'manager_id': result.manager_id,
            'content': result.content, 
            'deleted': 0
        }) if result else None

    return app  # 5)


create_app()

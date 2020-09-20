from sqlalchemy import text
from datetime import datetime

# action type = 1: ADD, 2: DELETE, 3: MOVE, 4: EDIT

#초기 DB 전체 todolist 데이터 세팅
def getAllManager__execute():
    return text("""		
            SELECT manager_id, name
            FROM todo_manager
            WHERE deleted = 0
        """)
def getAllTodo__execute():
    return text("""	
            SELECT todo_id, manager_id, content
            FROM todo
            WHERE deleted = 0
        """)
def getAllHistory__execute():
    return text("""	
            SELECT h.*, a.type
            FROM history h
            LEFT JOIN action_type a
                ON h.type_id = a.type_id
            WHERE 
                h.date < NOW()
                AND h.date >= NOW() - INTERVAL 12 HOUR
        """)

# 매니저 이름 정하기 
def setManagerName__execute():
    return text("""	
            UPDATE todo_manager
            SET name = :name
            WHERE manager_id = :manager_id
        """)
def setManagerName__result():
    return text("""
            SELECT manager_id, name
            FROM todo_manager
            WHERE manager_id = :id
        """)

# todo 추가
def add__execute():
    return text("""	
            INSERT INTO todo(
                manager_id,
                content,
                deleted
            ) VALUES (
                :manager_id,
                :content,
                0
            )
        """)
def add__history():
    return text("""
            INSERT INTO history(
                type_id,
                todo_id,
                date,
                current_manager_id
            ) VALUES (
                1,
                :todo_id,
                NOW(),
                :current_manager_id
            )
        """)

# todo 지우기
def delete__execute():
    return text("""	
            UPDATE todo
            SET deleted = 1
            WHERE todo_id = :id
        """)
def delete__history():
    return text("""
            INSERT INTO history(
                type_id,
                todo_id,
                date
            ) VALUES (
                2,
                :todo_id,
                NOW()
            )
        """)

# todo 이동
def move__execute():
    return text("""	
            UPDATE todo
            SET manager_id = :manager_id
            WHERE todo_id = :id
        """)
def move__history():
    return text("""
            INSERT INTO history(
                type_id,
                todo_id,
                date,
                prev_manager_id,
                current_manager_id
            ) VALUES (
                3,
                :todo_id,
                NOW(),
                :prev_manager_id,
                :current_manager_id
            );
        """)
# todo 수정
def edit__execute():
    return text("""	
                UPDATE todo
                SET content = :content
                WHERE todo_id = :id
            """)
def edit__history():
    return text("""
            INSERT INTO history(
                type_id,
                todo_id,
                date
            ) VALUES (
                4,
                :todo_id,
                NOW()
            )
        """)

# todo에 변화 발생 시 result 함수
def todo__result():
    return text("""
            SELECT t.todo_id, t.manager_id, t.content, h.date, a.type
            FROM todo t
            INNER JOIN history h
                ON t.todo_id = h.todo_id
            LEFT OUTER JOIN action_type a
                ON h.type_id = a.type_id
            WHERE t.todo_id = :id
                AND h.history_id = :history_id
        """)
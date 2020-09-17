from sqlalchemy import text
# action type = 1: ADD, 2: DELETE, 3: MOVE, 4: EDIT


#초기 DB 전체 todolist 데이터 세팅
def getAllManager__execute():
    return text("""		
            SELECT manager_id, name
            FROM todo_manager
        """)
def getAllTodo__execute():
    return text("""			# 1)
            SELECT todo_id, manager_id, content
            FROM todo
            WHERE deleted = 0
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
                :date,
                :current_manager_id
            )
        """)
def add__result():
    return text("""
            SELECT *
            FROM todo
            WHERE todo_id = :id
        """)

# todo 지우기
def delete__execute():
    return text("""	
            UPDATE todo
            SET deleted = 1
            WHERE todo_id = :id
        """)
def delete__result():
    return text("""
            SELECT todo_id, manager_id
            FROM todo
            WHERE todo_id = :id
            AND deleted = 1
        """)
def delete__history():
    return text("""
            INSERT INTO history(
                type_id,
                todo_id,
                date,
                prev_manager_id
            ) VALUES (
                2,
                :todo_id,
                :date,
                :prev_manager_id
            )
        """)

# todo 이동
def move__execute():
    return text("""	
            UPDATE todo
            SET manager_id = :manager_id
            WHERE todo_id = :id
        """)
def move__result():
    return text("""
            SELECT todo_id, manager_id, content
            FROM todo
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
                :date,
                :prev_manager_id,
                :current_manager_id
            )
        """)

# todo 수정
def edit__execute():
    return text("""	
                UPDATE todo
                SET content = :content
                WHERE todo_id = :id
            """)
def edit__result():
    return text("""
            SELECT todo_id, manager_id, content
            FROM todo
            WHERE todo_id = :id
        """)
def edit__history():
    return text("""
            INSERT INTO history(
                type_id,
                todo_id,
                date,
            ) VALUES (
                4,
                :todo_id,
                :date,
            )
        """)

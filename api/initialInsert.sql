INSERT INTO
  todo_manager
  (name, deleted)
VALUES
  ('할일', false),
  ('진행중', false),
  ('완료', false);
 
INSERT INTO
  todo
  (manager_id, content, deleted)
VALUES
  (3, '빨래하기', false),
  (2, 'SQL 쿼리 작성하기', false),
  (1, '쿼리 실행하기', false),
  (1, '리액트 환경 세팅하기', false);

INSERT INTO
  action_type
  (type)
VALUES
  ('ADD'),
  ('DELETE'),
  ('MOVE'),
  ('EDIT');
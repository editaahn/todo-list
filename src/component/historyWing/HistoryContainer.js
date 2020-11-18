import React from "react";
import { useSelector } from "react-redux";
import History from "./History";

const HistoryContainer = () => {
  const todoList = useSelector(({ todoList }) => todoList);
  const view = useSelector(({ view }) => view);

  const sortedHistories = todoList.histories.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });

  return (
    <aside 
      className="history-center" 
      style={{ 
        'right': view.histories ? '0' : `-30rem`,
      }}
    >
      <header className="history-center__header">
        <h2>History</h2>
        <p>최근 12시간 이력을 보여줍니다.</p>
      </header>
      <ul className="history-center__list">
        {sortedHistories.map((history) => (
          <History
            key={history.history_id}
            content={history.content}
            date={history.date}
            prev_manager={
              history.prev_manager_id && 
                todoList.managers.find(manager => manager.manager_id === history.prev_manager_id)
            }
            current_manager={
              history.manager_id &&
                todoList.managers.find(manager => manager.manager_id === history.manager_id)
            }
            type={history.type}
          />
        ))}
      </ul>
    </aside>
  );
};

export default HistoryContainer;

import React from "react";
import { useSelector } from "react-redux";
import History from "./History";

const HistoryContainer = ({isHistoryOpen}) => {
  const histories = useSelector(({ todoList }) => todoList.histories);
  const managers = useSelector(({ todoList }) => todoList.managers);
  const sortedHistories = histories.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });

  return (
    <aside className="history-center" style={{ 'right' : isHistoryOpen ? '0' : '-28rem' }}>
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
            prev_manager_name={
              history.prev_manager_id &&
                managers.find(manager => manager.manager_id === history.prev_manager_id).name
            }
            current_manager_name={
              history.manager_id &&
                managers.find(manager => manager.manager_id === history.manager_id).name
            }
            type={history.type}
          />
        ))}
      </ul>
    </aside>
  );
};

export default HistoryContainer;

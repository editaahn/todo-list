import React from "react";

const History = ({
  type,
  content,
  date,
  prev_manager_name,
  current_manager_name,
}) => {
  const now = new Date()
  const past = new Date(date)
  past.setHours(past.getHours()-9)

  const hour = now.getHours() > past.getHours() ? (now.getHours()-past.getHours()+'시간 ') : '',
  minute = now.getMinutes() > past.getMinutes() ? (now.getMinutes()-past.getMinutes()+'분 ') : '',
  second = now.getSeconds() > past.getSeconds() ? (now.getSeconds()-past.getSeconds()+'초 ') : '';
  
  return (
    <li className="history-center__history">
      <span>{type.toLowerCase()}{type == 'EDIT' || type == 'ADD' ? 'ed': 'd'} </span>
      <strong> {content}</strong>
      {type === "MOVE" && <span> from <em>{prev_manager_name}</em> to <em>{current_manager_name}</em></span>}
      {type === "DELETE" && <span> from <em>{prev_manager_name}</em> </span>}
      {type === "ADD" && <span> to <em>{current_manager_name}</em> </span>}
      <p className="history-center__history__time">
        {hour}{minute}{!hour && !minute && second}
        {!hour && !minute && !second && '방금 '}
        전
      </p>
    </li>
  );
};

export default History;

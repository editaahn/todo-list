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
  // console.log(content, 'now,',now)
  // console.log(past)
  const timeDiff = now.getTime()-past.getTime();

  const hour = Math.floor(timeDiff/(1000*60*60)) || '',
  minute = Math.floor(timeDiff/(1000*60)%60) || '',
  second = Math.floor(timeDiff/1000%60%60) || '';
  
  return (
    <li className="history-center__history">
      <span>
        {type.toLowerCase()}
        {type === "EDIT" || type === "ADD" ? "ed" : "d"}
      </span>
      <strong> {content}</strong>
      {type === "MOVE" && (
        <span>
          {" "}
          from <em>{prev_manager_name}</em>
          {" "}
          to <em>{current_manager_name}</em>
        </span>
      )}
      {type === "DELETE" && (
        <span>
          {" "}
          from <em>{prev_manager_name}</em>
        </span>
      )}
      {type === "ADD" && (
        <span>
          {" "}
          to <em>{current_manager_name}</em>
        </span>
      )}
      <p className="history-center__history__time">
        {hour && hour + "시간 "}
        {minute && minute + "분 "}
        {!hour && !minute && second && second + "초 "}
        {!hour && !minute && !second && "방금 "}전
      </p>
    </li>
  );
};

export default History;

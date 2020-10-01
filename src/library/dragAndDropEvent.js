export const drag = (e, order, index) => {
  const todoIDdragged =  e.target.getAttribute("todo_id") * 1;
  const prevManagerIDdragged =  e.target.getAttribute("manager_id") * 1;

  const dataToSend = {
    todo_id: todoIDdragged,
    prev_manager_id: prevManagerIDdragged,
    prev_manager_order: order,
    prev_index: index
  };

  e.dataTransfer.setData("text/plain", JSON.stringify(dataToSend));
  e.dataTransfer.effectAllowed = "move";
};

export const dragEnter = (e) => {
  e.target.tagName === "LI" &&
    e.target.classList.replace(
      e.target.className,
      "todo-wrapper--dragged--before"
    );
};

export const dragLeave = (e) => {
  e.target.tagName === "LI" &&
    e.target.classList.replace(e.target.className, "todo-wrapper");
};

export const allowDrop = (e) => {
  e.preventDefault();
};

export const drop = (e, moveTodo, order) => {
  e.preventDefault();

  let droppedNode;
  if (e.target.tagName === "LI")
    droppedNode = e.target
  else if (e.target.tagName === "UL")
    droppedNode = e.target.lastElementChild || e.target
  else
    droppedNode = e.target.closest("li");

  const data = {
    ...JSON.parse(e.dataTransfer.getData("text/plain")),
    curr_manager_id: droppedNode.getAttribute('manager_id') * 1,
    curr_manager_order: order,
    curr_index: 
      e.target.tagName === "UL" ? e.target.childElementCount : droppedNode.getAttribute('index') * 1,
  }

  // 다른 manager로 옮기는 경우
  if ( data.curr_manager_id !== data.prev_manager_id ){
    data.prev_manager_order = data.prev_manager_order.filter(todo => todo !== data.todo_id)
    data.curr_manager_order = 
      order.length === 0 ? [ data.todo_id ] : newOrder(data.curr_manager_order)
  }
  // 내부에서 옮기는 경우
  else {
    const prevIndexRemoved = data.curr_manager_order.filter(todo => todo !== data.todo_id)
    data.curr_manager_order = 
      order.length === 0 ? [ data.todo_id ] : newOrder(prevIndexRemoved)
  }

  function newOrder(prevOrder) {
    return prevOrder.reduce((acc, todoInOrder, i, arr) => {
      if (data.curr_index === arr.length && i === arr.length-1)
        return [ ...acc, todoInOrder, data.todo_id ] // 빈 공간에 drop한 경우 끝으로 붙임
      else if (i === data.curr_index) 
        return [ ...acc, data.todo_id, todoInOrder ] // todo li들 사이에 drop한 경우 drop 위치에 끼움
      else 
        return [ ...acc, todoInOrder ]
    }, [])
  }

  data.prev_manager_order = data.prev_manager_order.join(',');
  data.curr_manager_order = data.curr_manager_order.join(',');
  
  moveTodo(data);
  droppedNode.tagName !== "UL" &&
    droppedNode.classList.replace(droppedNode.className, "todo-wrapper");
};
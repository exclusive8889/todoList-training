import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { removeTask } from "../../stores/slice/taskSlice";

import styles from "./Task.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function Task({
  title,
  idcate,
  status,
  idtask,
  updateTask,
}) {
  const dispatch = useDispatch();
  const handleRemoveTask = (idtask) => {
    dispatch(removeTask(idtask));
  };
  return (
    <div
      className={cx("wrap")}
      style={{ textDecoration: status != "IN_PROGRESS" ? "line-through" : "" }}
    >
      <div className={cx("task-info")}>
        <p className={cx("task-info-text")}>{title}</p>
      </div>
      <div className={cx(status)}>
        <span
          onClick={() => {
            updateTask(title, idcate, idtask);
          }}
        >
          <FontAwesomeIcon icon={faPen} />
        </span>
        <span onClick={() => handleRemoveTask(idtask)}>
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </div>
    </div>
  );
}

export default Task;

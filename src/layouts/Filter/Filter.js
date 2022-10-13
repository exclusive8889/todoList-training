import Select from "react-select";

import filterSlice from "../../stores/slice/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useMemo } from "react";
import taskSlice, {
  addTask,
  getTasks,
  removeTask,
} from "../../stores/slice/taskSlice";
import { STATUS } from "../Task/constants";

import styles from "./Filter.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Filter() {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState([]);

  const { listCategories, paramTask, listRemoveMultiTask } = useSelector(
    (state) => ({
      listCategories: state?.categories?.list,
      paramTask: state?.filterSlice?.paramTask,
      listRemoveMultiTask: state?.taskSlice?.removeTasks,
    })
  );

  const valueAddtask = useRef({
    title: "",
    categoryIds: [],
  });

  const listcate = useMemo(() => {
    const list = listCategories?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    return list;
  }, [listCategories]);

  const handleAddtask = async () => {
    valueAddtask.current.categoryIds = selectedOption.map((item) => item.value);
    const response = await dispatch(addTask(valueAddtask.current));
    if (addTask.fulfilled.match(response)) {
      await dispatch(getTasks(paramTask));
    } else {
      alert(response.payload);
    }
  };

  const handleRemoveMultiTasks = async () => {
    const arr = [];
    for (let i = 0; i < listRemoveMultiTask.length; i++) {
      const response = await dispatch(removeTask(listRemoveMultiTask[i]));
      if (removeTask.fulfilled.match(response)) {
      } else {
        alert(response.payload);
        arr.push(listRemoveMultiTask[i]);
      }
    }
    await dispatch(taskSlice.actions.removeTasks(arr));
    await dispatch(getTasks(paramTask));
  };

  const handleNumberOfTask = async (numbers) => {
    await dispatch(filterSlice.actions.limitTask(Number(numbers)));
  };

  const handleFilterStatus = async (status) => {
    await dispatch(filterSlice.actions.setStatus(status));
  };

  return (
    <div className={cx("wraper")}>
      <div className={cx("optinon-filter")}>
        <div className={cx("addTask")}>
          <button onClick={handleAddtask}>Add Task</button>
          <div>
            <input
              placeholder="Add Title"
              onChange={(e) => {
                valueAddtask.current.title = e.target.value;
              }}
            />
            <Select
              closeMenuOnSelect={false}
              defaultValue={[]}
              isMulti
              name="colors"
              options={listcate}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={setSelectedOption}
            />
          </div>
        </div>
        <div>
          <label for="cars">Number of tasks:</label>
          <select
            name="cars"
            id="cars"
            onChange={(e) => {
              handleNumberOfTask(e.target.value);
            }}
          >
            <option value={3}>...</option>
            <option value={10}>10</option>
            <option value={6}>6</option>
            <option value={3}>3</option>
          </select>
        </div>

        <div>
          <label>FIlter Tasks</label>
          <select
            onChange={(e) => {
              handleFilterStatus(e.target.value);
            }}
          >
            <option value={""}>all</option>
            <option value={STATUS.COMPLETED}>{STATUS.COMPLETED}</option>
            <option value={STATUS.IN_PROGRESS}>{STATUS.IN_PROGRESS}</option>
          </select>
        </div>
        <button onClick={handleRemoveMultiTasks}>Delete</button>
      </div>
    </div>
  );
}

export default Filter;

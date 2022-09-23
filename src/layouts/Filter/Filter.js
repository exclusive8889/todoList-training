import Select from "react-select";
import Search from "../../component/Search/Search";
import filterSlice from "../../stores/slice/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useMemo, useEffect } from "react";
import { addTask, getTasks, removeTask } from "../../stores/slice/taskSlice";

import styles from "./Filter.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Filter() {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState([]);
  const listCategories = useSelector((state) => state?.categories?.list);
  const paramTask = useSelector((state) => state?.filterSlice?.paramTask);
  const listRemoveMultiTask = useSelector(
    (state) => state?.taskSlice?.removeTasks
  );

  const valueAddtask = useRef({
    title: "",
    categoryIds: [],
  });

  const handleAddtask = async () => {
    valueAddtask.current.categoryIds = selectedOption.map((item) => item.value);
    const response = await dispatch(addTask(valueAddtask.current));
    if (addTask.fulfilled.match(response)) {
      await dispatch(getTasks(paramTask));
    } else {
      alert("error");
    }
  };

  const handleNumberOfTask = async (numbers) => {
    await dispatch(filterSlice.actions.limitTask(Number(numbers)));
    // await dispatch(getTasks({ ...paramTask, limit: Number(numbers) }));
  };

  const handleRemoveMultiTasks = async () => {
    for (let i = 0; i < listRemoveMultiTask.length; i++) {
      const response = await dispatch(removeTask(listRemoveMultiTask[i]));
      if (removeTask.fulfilled.match(response)) {
      } else {
        alert("error");
      }
    }
    await dispatch(getTasks(paramTask));
  };

  const handleFilterStatus = async (status) => {
    // const response =await dispatch(filterSlice.actions.setStatus(status))
    // if(response>0) await dispatch(getTasks(paramTask));
    // console.log(paramTask)
    // if (status == "") 
    await dispatch(filterSlice.actions.setStatus(status));
    // else {
      // await dispatch(filterSlice.actions.setStatus(status))
      // await dispatch(getTasks({ ...paramTask, status: status }));
    // }
  };


  useEffect(()=>{
    dispatch(getTasks(paramTask));
  },[paramTask])

  const listcate = useMemo(() => {
    const list = listCategories?.map((item, index) => ({
      value: item.id,
      label: item.name,
    }));
    return list;
  }, [listCategories]);

  return (
    <div className={cx("wraper")}>
      {/* <Search /> */}
      <div className={cx("optinon-filter")}>
        <div className={cx("addTask")}>
          <button onClick={handleAddtask}>Add Task</button>
          <div>
            <input placeholder="Add Title"
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
            <option value={"COMPLETED"}>Complete</option>
            <option value={"IN_PROGRESS"}>IN_PROGRESS</option>
          </select>
        </div>
        <button onClick={handleRemoveMultiTasks}>Delete</button>
      </div>
    </div>
  );
}

export default Filter;

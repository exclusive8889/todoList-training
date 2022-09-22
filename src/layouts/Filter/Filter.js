import styles from "./Filter.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { addTask, getTasks, removeTask } from "../../stores/slice/taskSlice";
import filterSlice from "../../stores/slice/searchSlice";
const cx = classNames.bind(styles);
function Filter() {
  const dispatch = useDispatch();
  const paramTask = useSelector((state) => state.filterSlice.paramTask);
  const listRemoveMultiTask = useSelector(
    (state) => state.taskSlice.removeTasks
  );
  // console.log(listRemoveMultiTask)
  const handleAddtask = () => {
    dispatch(
      addTask({
        title: "1",
        categoryIds: [
          "0634d6a5-0c7c-4f9c-a987-2468e3987d3d",
          "afb2152a-90fa-48df-a605-737ced47a6a1",
        ],
      })
    );
  };
  const handleNumberOfTask = async (numbers) => {
    await dispatch(filterSlice.actions.limitTask(Number(numbers)));
    await dispatch(getTasks({ ...paramTask, limit: Number(numbers) }));
    // await dispatch(getTasks({ limit:numbers,page: 1 }));
  };
  const handleRemoveMultiTasks = async () => {
    await listRemoveMultiTask.forEach(async (id) => {
      const response = await dispatch(removeTask(id));
      if (removeTask.fulfilled.match(response)) {
      } else {
        alert("error");
      }
    });
    await dispatch(getTasks(paramTask));
  };
  const handleFilterStatus=async(status)=>{
      if(status=='') await dispatch(getTasks(paramTask));
      else{
        await dispatch(getTasks({ ...paramTask, status:status}));
      }
  }
  return (
    <div className={cx("wraper")}>
      <div className={cx("search")}>
        <select
          className={cx("search-select", "search--height")}
          // onChange={handlefilterCate}
        >
          <option value="">All</option>
          {/* {listCategories?.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))} */}
        </select>
        <input
          placeholder="Search task"
          className={cx("search-input", "search--height")}
          // onChange={handleSearchTextTask}
        ></input>
      </div>
      
      <div className={cx("optinon-filter")}>
        <button onClick={handleAddtask}>Add Task</button>
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
        <select onChange={(e)=>{
          handleFilterStatus(e.target.value)
        }}>
            <option value={''}>all</option>
            <option value={'COMPLETED'}>Complete</option>
            <option value={'IN_PROGRESS'}>IN_PROGRESS</option>
        </select>
      </div>
        <button onClick={handleRemoveMultiTasks}>Delete</button>
      </div>
      
    </div>
  );
}

export default Filter;

import styles from "./Filter.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { addTask } from "../../stores/slice/taskSlice";
const cx = classNames.bind(styles);
function Filter() {
  const dispatch =useDispatch()
  const handleAddtask=()=>{
      dispatch(addTask({
        title:'1',
        categoryIds: [
          "0634d6a5-0c7c-4f9c-a987-2468e3987d3d",
          "afb2152a-90fa-48df-a605-737ced47a6a1"
        ]
      }))
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
         <button>1</button>
         <button>1</button>
        </div>
    </div> 
    );
}

export default Filter;
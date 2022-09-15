import styles from "./Filter.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function Filter() {
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
         <button>1</button>
         <button>1</button>
         <button>1</button>
        </div>
    </div> 
    );
}

export default Filter;
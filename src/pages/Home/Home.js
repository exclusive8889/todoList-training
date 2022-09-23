import Header from "../../layouts/Header/Header";
import Filter from "../../layouts/Filter/Filter";
import TableTask from "../../layouts/TableTask/TableTask";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

function Home() {
  return (
    <>
      <Header  />
      <div className={cx("container")}>
        <Filter/>
        <TableTask/>
      </div>
    </>
  );
}

export default Home;

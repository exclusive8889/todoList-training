import Header from "../../layouts/Header/Header";
import styles from "./Home.module.scss";
import Filter from "../../layouts/Filter/Filter";
import classNames from "classnames/bind";
import TableTask from "../../layouts/TableTask/TableTask";
import { signin } from "../../stores/slice/authSlice";
import { useDispatch } from "react-redux";
const cx = classNames.bind(styles);

function Home() {
  // const dispatch=useDispatch();
  // dispatch(signin())
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

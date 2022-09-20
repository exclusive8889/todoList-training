import Header from "../../layouts/Header/Header";
import styles from "./Home.module.scss";
import Filter from "../../layouts/Filter/Filter";
import classNames from "classnames/bind";
import TableTask from "../../layouts/TableTask/TableTask";
import { signin } from "../../stores/slice/authSlice";
import { getTasks } from "../../stores/slice/taskSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
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

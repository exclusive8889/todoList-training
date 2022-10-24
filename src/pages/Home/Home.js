import Header from "../../layouts/Header/Header";
import Filter from "../../layouts/Filter/Filter";
import TableTask from "../../layouts/TableTask/TableTask";

import { getCategories } from "../../stores/slice/categoriesSlice";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

function Home() {
  const dispatch = useDispatch();
  const fetchCategories = useCallback(async () => {
    await dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <Header />
      <div className={cx("container")}>
        <Filter />
        <TableTask />
      </div>
    </>
  );
}

export default Home;

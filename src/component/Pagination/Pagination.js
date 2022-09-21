import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import styles from "./Pagination.module.scss";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../stores/slice/taskSlice";
const cx = classNames.bind(styles);

function PaginatedItems({setPage}) {
  const dispatch = useDispatch();
  const meta = useSelector((state) => state.taskSlice.meta);

  const pages = [];
  for (let i = 1; i <= meta.totalPages; i++) {
    pages.push(i);
  }
  const listPages = pages.map((page) => (
    <li
      key={page}
      className={cx("page-item")}
        onClick={() => {
          setPage(page);
        }}
    >
      <a className={cx("page-link", meta.currentPage == page ? "active" : null)}>
        {page}
      </a>
    </li>
  ));

  return (
    <>
      <div className={cx("pagi")}>
        <ul className={cx("pagination")}>
          {meta.currentPage > 1 && (
            <li className={cx("page-pre")}>
              <button
                className={cx("page-link")}
                disabled={meta.currentPage <= 1}
                onClick={() => {
                  setPage((pre) => pre - 1);
                  // setFind(!find);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </li>
          )}
          {listPages}
          {meta.currentPage < meta.totalPage && (
            <li className={cx("page-next")}>
              <button
                clbuttonssName={cx("page-link")}
                // onClick={() => {
                //   setCurrentPage((pre) => pre + 1);
                //   setFind(!find);
                // }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
export default memo(PaginatedItems)

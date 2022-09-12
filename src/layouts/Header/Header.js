import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";

import { ApiClient } from "../../request/request";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../stores/slice/authSlice";
import { useEffect, useState } from "react";
import filterSlice from "../../stores/slice/searchSlice";
import useDebounce from "../../hook/debounce";
import { logout } from "../../utils/apiRequest";

import ChangePassword from "../../component/ChangePassword/ChangePassword";

import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";

import styles from "./Header.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Header({ filter }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currenUser);
  const listCategories = useSelector((state) => state.categories.list[0]);

  const handlefilterCate = (e) => {
    filter(e.target.value);
  };
  useEffect(() => {
    ApiClient.get(`/api/users/${localStorage.getItem("id")}`).then((res) => {
      dispatch(loginSuccess(res.data));
    });
  }, []);

  // debounce search
  const [searchText, setSearchText] = useState("");
  const debonce = useDebounce(searchText, 800);
  const handleSearchTextTask = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    dispatch(filterSlice.actions.changgSearchText(debonce));
  }, [debonce]);

  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrap-search")}>
        <div className={cx("search")}>
          <select
            className={cx("search-select", "search--height")}
            onChange={handlefilterCate}
          >
            <option value="">All</option>
            {listCategories?.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            placeholder="Search task"
            className={cx("search-input", "search--height")}
            onChange={handleSearchTextTask}
          ></input>
          <button className={cx("search-btn", "search--height")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <Tippy
          interactive
          visible={visible}
          onClickOutside={hide}
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <div className={cx("option-user")} onClick={visible && hide}>
                <ChangePassword />
                <button onClick={logout}>Log out</button>
              </div>
            </div>
          )}
        >
          <div className={cx("user")} onClick={visible ? hide : show}>
            <FontAwesomeIcon icon={faUser} />
            <p>{user?.username}</p>
          </div>
        </Tippy>
      </div>
    </div>
  );
}

export default Header;

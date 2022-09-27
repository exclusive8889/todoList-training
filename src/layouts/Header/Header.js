import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { ApiClient } from "../../request/request";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { logout } from "../../utils/apiRequest";
import { loginSuccess } from "../../stores/slice/authSlice";
import ChangePassword from "../../component/ChangePassword/ChangePassword";
import Search from "../../component/Search/Search";

import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react/headless";

import styles from "./Header.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const onVisible=()=>{
    visible ? hide():show()
  }

  useEffect(async() => {
    await ApiClient.get(`/api/users/${localStorage.getItem("id")}`).then((res) => {
      dispatch(loginSuccess(res.data.data));
    });
  }, []);
  
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrap-search")}>
        <div>
          <Search/>
        </div>
        <Tippy
          interactive
          visible={visible}
          onClickOutside={hide}
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <div className={cx("option-user")} onClick={onVisible}>
                <ChangePassword />
                <button onClick={logout}>Log out</button>
              </div>
            </div>
          )}
        >
          <div className={cx("user")} onClick={onVisible}>
            <FontAwesomeIcon icon={faUser} />
            <p>{user?.username}</p>
          </div>
        </Tippy>
      </div>
    </div>
  );
}

export default Header;

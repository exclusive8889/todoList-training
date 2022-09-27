import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { Message_LoginAuth } from "../../pages/Auth/constants";
import { changePasswordFailed } from "../../stores/slice/authSlice";
import { changePassword } from "../../stores/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "./ChangePassword.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(true);
  
  const errorChangePassword = useSelector((state) => state.auth.errorChangePassword);
  const idUser = useSelector((state) => state.auth.login?.currenUser?.id);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    changePassword(
      { username, newPassword: password },
      idUser,
      handleClose,
      dispatch
    );
  };

  useEffect(() => {
    dispatch(changePasswordFailed(""));
  }, [show, username]);

  useEffect(() => {
    password.length >= 6 ? setDisable(false) : setDisable(true);
  }, [password]);
  
  return (
    <>
      <button onClick={handleShow}>Change information</button>
      <Modal show={show} onHide={handleClose}>
        <div className={cx("wrap-changepw")}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your username with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {disable && (
                <label className="text-error">
                  {Message_LoginAuth.MIN_6CHAR}
                </label>
              )}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={handleChangePassword}
              disabled={disable}
            >
              Update
            </Button>
            <label className="text-error">{errorChangePassword}</label>
          </Form>
        </div>
      </Modal>
    </>
  );
}
export default ChangePassword;

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { changePassword } from "../../stores/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./ChangePassword.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const idUser = useSelector((state) => state.auth.login?.currenUser?.id);
  const handleChangePassword = async (e) => {
    e.preventDefault();
    changePassword({ username, newPassword: password }, idUser, handleClose);
  };

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
                placeholder="Enter email"
                onChange={(e) => setusername(e.target.value)}
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
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={handleChangePassword}
            >
              Update
            </Button>
          </Form>
        </div>
      </Modal>
    </>
  );
}
export default ChangePassword;

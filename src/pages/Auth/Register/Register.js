import { register } from "../../../stores/slice/authSlice";
import { Message_LoginAuth } from "../constants";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as Yup from "yup";

function Register({ changeAuthMode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorRegister = useSelector((state) => state.auth.errorRegister);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmpw: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(Message_LoginAuth.REQUIRED_USERNAME),
      password: Yup.string()
        .required(Message_LoginAuth.REQUIRED_PASSWORD)
        .min(6, Message_LoginAuth.MIN_6CHAR),
      confirmpw: Yup.string()
        .required(Message_LoginAuth.REQUIRED_CONFIRMPW)
        .oneOf([Yup.ref("password"), null], Message_LoginAuth.CONFIRM_PASSWORD),
    }),
  });

  const handleRegister = (e) => {
    const newUser = {
      username: formik.values.username,
      password: formik.values.password,
    };
    e.preventDefault();
    register(newUser, navigate, dispatch, changeAuthMode);
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="text-center">
            Already registered?&nbsp;
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Usename</label>
            <input
              name="username"
              type="text"
              className="form-control mt-1"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && (
              <label className="text-error">{formik.errors.username}</label>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <label className="text-error">{formik.errors.password}</label>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              name="confirmpw"
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={formik.values.confirmpw}
              onChange={formik.handleChange}
            />
            {formik.errors.confirmpw && (
              <label className="text-error">{formik.errors.confirmpw}</label>
            )}
          </div>

          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!formik.isValid}
              onClick={handleRegister}
            >
              Submit
            </button>
            <label className="text-error">{errorRegister}</label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;

import Header from "../../layouts/Header/Header";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Home() {
  return (
    <>
      <Header  />
      <div className={cx("container")}>
        <h1>home</h1>
      </div>
      
    </>
  );
}

export default Home;

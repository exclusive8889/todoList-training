import React, { memo, useState, useEffect } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import Tasks from "../Task/Task";
import { updateTask } from "../../stores/slice/taskSlice";
import { getTasks, removeTask } from "../../stores/slice/taskSlice";

function TableTask() {
  const dispatch = useDispatch();
  const [currentPage, setCurrenPage] = useState(1);
  const { items, Loading } = useSelector((state) => state?.taskSlice);
  useEffect(() => {
    dispatch(getTasks({ currentPage: currentPage }));
  }, []);

  const handleUpdateTask = async (data, id) => {
    dispatch(updateTask({ id: id, datatask: data })).then(() => {
      dispatch(getTasks({ currentPage: currentPage }));
    });
  };

  if (Loading) return <p>Loading...</p>;
  return (
    <MDBTable bordered>
      <MDBTableHead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Categories</th>
          <th scope="col">Create at</th>
          <th scope="col">Update at</th>
          <th scope="col">Complete</th>
          <th scope="col">Option</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {items?.map((item) => (
          <Tasks
            key={item.id}
            data={item}
            handleUpdateTask={handleUpdateTask}
            currentPage={currentPage}
          />
        ))}
      </MDBTableBody>
      <div>
        <span onClick={() => setCurrenPage(1)}>1</span>
        <span onClick={() => setCurrenPage(2)}>2</span>
        <span onClick={() => setCurrenPage(3)}>3</span>
        <span onClick={() => setCurrenPage(4)}>4</span>
      </div>
    </MDBTable>
  );
}
export default TableTask;

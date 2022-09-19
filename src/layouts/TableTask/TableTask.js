import React, { memo, useState } from "react";
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

function TableTask() {
  const dispatch = useDispatch();
  const [rerender, setRerender] = useState(true);
  const tasks = useSelector((state) => state.taskSlice?.items);
  console.log("reander taskkkkkk");
  const handleUpdateTask = (data, id) => {
    // if (data.status == "COMPLETED" ) return;
    dispatch(updateTask({ id: id, datatask: data }));
    setRerender(!rerender);
  };
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
        {tasks?.map((item) => (
          <Tasks
            key={item.id}
            data={item}
            handleUpdateTask={handleUpdateTask}
          />
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
export default memo(TableTask);

import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import Tasks from "../Task/Task";
import taskSlice from "../../stores/slice/taskSlice";
import Loading from "../../component/Loading/Loading";
import PaginatedItems from "../../component/Pagination/Pagination";

function TableTask() {
  const dispatch = useDispatch();
  const { items, loading, meta } = useSelector((state) => state?.taskSlice);
  const [pendingRemoveTasks, setPendingRemoveTask] = useState([]);

  const reTasks =((id) => {
    setPendingRemoveTask((pre) => {
      const isChecked = pendingRemoveTasks.includes(id);
      if (isChecked) {
        return pendingRemoveTasks.filter((item) => item !== id);
      } else {
        return [...pre, id];
      }
    });
  });

  useEffect(() => {
    dispatch(taskSlice.actions.removeTasks(pendingRemoveTasks));
  }, [pendingRemoveTasks]);

  if (loading) return <Loading />;
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
            reTasks={reTasks}
            pendingRemoveTasks={pendingRemoveTasks}
          />
        ))}
      </MDBTableBody>
      <div>
        <PaginatedItems/>
      </div>
    </MDBTable>
  );
}
export default TableTask;

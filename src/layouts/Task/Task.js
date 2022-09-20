import React, { useMemo, useState, memo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { updateTask,removeTask } from "../../stores/slice/taskSlice";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
function Tasks({ data, handleUpdateTask }) {
  const dispatch=useDispatch()
  const [cateOfTask, setCateOfTask] = useState();
  const [status, setStatus] = useState(data.status);
  const listCategories = useSelector((state) => state?.categories?.list[0]);
  const [dataUpdateTask, setDataUpdateTask] = useState({
    title: data.title,
    categoryIds: data.categories.map((list) => list.id),
    status: data.status,
  });
  const [defaultCate, setDefaultCate] = useState(
    data?.categories.map((item, index,handleDeleteTask) => ({
      value: item.id,
      label: item.name,
    }))
  );
  const listcate = useMemo(() => {
    if (status == "COMPLETED") return [];
    const list = listCategories?.map((item, index) => ({
      value: item.id,
      label: item.name,
    }));
    return list;
  }, [status]);

  useEffect(() => {
    if (!cateOfTask || status == "COMPLETED") return;
    setDataUpdateTask({
      ...dataUpdateTask,
      categoryIds: cateOfTask.map((list) => list.value),
    });
  }, [cateOfTask]);

  useEffect(() => {
    setDataUpdateTask({
      ...dataUpdateTask,
      status: status,
    });
  }, [status]);

  useEffect(() => {
    if (!dataUpdateTask || status == "COMPLETED") return;
    handleUpdateTask(dataUpdateTask, data.id);
  }, [dataUpdateTask]);

  const handleCompleted = () => {
    status == "COMPLETED" ? setStatus("IN_PROGRESS") : setStatus("COMPLETED");
  };
  // const handleDeleteTask =(id)=>{
  //   dispatch(removeTask(id))
  // }
  return (
    <>
      <tr>
        <td>
          <input type="checkbox"></input>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <p>{data?.title}</p>
          </div>
        </td>
        <td>
          <Select
            closeMenuOnSelect={false}
            defaultValue={defaultCate}
            isMulti
            name="colors"
            options={listcate}
            className="basic-multi-select"
            classNamePrefix="select"
            isDisabled={status == "COMPLETED"}
            onChange={setCateOfTask}
          />
        </td>
        <td> {data?.createdAt}</td>
        <td>{data?.updatedAt}</td>
        <td>
          <input
            type="checkbox"
            checked={status == "COMPLETED"}
            onChange={handleCompleted}
          ></input>
        </td>
        <td>
          <span>
            <MDBBtn color="success" rounded size="sm">
              Edit
            </MDBBtn>
          </span>
          <MDBBtn color="danger" rounded size="sm" onClick={()=>{
            // handleDeleteTask(data.id)
          }}>
            Delete
          </MDBBtn>
        </td>
      </tr>
    </>
  );
}

export default memo(Tasks);

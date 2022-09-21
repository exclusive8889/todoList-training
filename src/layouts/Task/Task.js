import React, { useMemo, useState, memo, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { updateTask, removeTask, getTasks } from "../../stores/slice/taskSlice";
import { MDBBtn } from "mdb-react-ui-kit";
import taskSlice from "../../stores/slice/taskSlice";
function Tasks({ data, currentPage }) {
  const dispatch = useDispatch();
  const inputEditRef = useRef();
  const listCategories = useSelector((state) => state?.categories?.list);
  const [editTask, setEdittask] = useState(false);
  const [cateOfTask, setCateOfTask] = useState();
  const [valueInputTask, setValueInputTask] = useState(data.title);
  const [status, setStatus] = useState(data.status);
  const [dataUpdateTask, setDataUpdateTask] = useState(
    {
    title: data.title,
    categoryIds: data.categories.map((list) => list.id),
    status: data.status,
  }
  );
  const [defaultCate, setDefaultCate] = useState(
    data?.categories.map((item, index) => ({
      value: item.id,
      label: item.name,
    }))
  );
  const listcate = useMemo(() => {
    // console.log('tungre')
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



  const updateTitleTask = () => {
    setDataUpdateTask({
      ...dataUpdateTask,
      title: valueInputTask,
    });
    setEdittask(false)
  };

  const handleUpdateTask = async (data, id) => {
    const response = await dispatch(updateTask({ id: id, datatask: data }));
    if (updateTask.fulfilled.match(response)) {
      dispatch(getTasks({ currentPage: currentPage }));
    } else {
      alert("error");
    }
  };

  const handleCompleted = () => {
    status == "COMPLETED" ? setStatus("IN_PROGRESS") : setStatus("COMPLETED");
  };
  const handleDeleteTask = async (id) => {
    const response = await dispatch(removeTask(id));
    if (removeTask.fulfilled.match(response)) {
      dispatch(getTasks({ currentPage: currentPage }));
    } else {
      alert("error");
    }
  };
  // const reTasks = (id) => {
  //   dispatch(taskSlice.actions.removeTasks(id));
  // };

  //  useEffect(() => {
  //   if (!dataUpdateTask) return;
  //   handleUpdateTask(dataUpdateTask, data.id);
  // }, [dataUpdateTask]);
  console.log('re-render')
  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            // onChange={() => {
            //   reTasks(data.id);
            // }}
          ></input>
        </td>
        <td>
          <div className="d-flex align-items-center">
            {!editTask ? (
              <p>{data?.title}</p>
            ) : (
              <>
                <input
                  value={valueInputTask}
                  ref={inputEditRef}
                  onChange={(e) => {
                    setValueInputTask(e.target.value);
                  }}
                />
                <button onClick={updateTitleTask}>Update</button>
              </>
            )}
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
            checked={status === "COMPLETED"}
            onChange={handleCompleted}
          ></input>
        </td>
        <td>
          <span>
            <MDBBtn
              color="success"
              rounded
              size="sm"
              onClick={() => {
                setEdittask(!editTask);
                // if (!updateTask) inputEditRef.current.focus();
              }}
            >
              Edit
            </MDBBtn>
          </span>
          <MDBBtn
            color="danger"
            rounded
            size="sm"
            onClick={() => {
              handleDeleteTask(data.id);
            }}
          >
            Delete
          </MDBBtn>
        </td>
      </tr>
    </>
  );
}

export default memo(Tasks);

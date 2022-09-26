import React, { useMemo, useState, memo, useEffect, useRef } from "react";
import Select from "react-select";
import { MDBBtn } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { updateTask, removeTask, getTasks } from "../../stores/slice/taskSlice";
import { STATUS } from "./constants";

function Tasks({ data, reTasks, pendingRemoveTasks }) {
  const dispatch = useDispatch();
  const paramTask = useSelector((state) => state.filterSlice.paramTask);
  const listCategories = useSelector((state) => state?.categories?.list);

  const [editTask, setEdittask] = useState(false);
  const [cateOfTask, setCateOfTask] = useState();
  const [valueInputTask, setValueInputTask] = useState(data.title);

  const inputEditRef = useRef();
  const dataUpdateTask = useRef({
    title: data.title,
    categoryIds: data.categories.map((list) => list.id),
    status: data.status,
  });

  const [defaultCate, setDefaultCate] = useState(
    data?.categories.map((item, index) => ({
      value: item.id,
      label: item.name,
    }))
  );

  const listcate = useMemo(() => {
    if (data.status === STATUS.COMPLETED) return [];
    const list = listCategories?.map((item, index) => ({
      value: item.id,
      label: item.name,
    }));
    return list;
  }, [dataUpdateTask?.current,listCategories]);
  
  useEffect(() => {
    if (!cateOfTask) return;
    dataUpdateTask.current = {
      ...dataUpdateTask.current,
      categoryIds: cateOfTask.map((list) => list.value),
    };
    handleUpdateTask(dataUpdateTask.current, data.id);
  }, [cateOfTask]);

  const updateTitleTask = async () => {
    dataUpdateTask.current = {
      ...dataUpdateTask.current,
      title: valueInputTask,
    };
    await handleUpdateTask(dataUpdateTask.current, data.id);
    setEdittask(false);
  };

  const handleUpdateTask = async (data, id) => {
    const response = await dispatch(updateTask({ id: id, datatask: data }));
    if (updateTask.fulfilled.match(response)) {
      dispatch(getTasks(paramTask));
    } else {
      alert("error");
    }
  };

  const handleCompleted = async () => {
    data.status === STATUS.COMPLETED
      ? (dataUpdateTask.current = {
          ...dataUpdateTask.current,
          status: STATUS.IN_PROGRESS,
        })
      : (dataUpdateTask.current = {
          ...dataUpdateTask.current,
          status: STATUS.COMPLETED,
        });
    await handleUpdateTask(dataUpdateTask.current, data.id);
  };

  const handleDeleteTask = async (id) => {
    const response = await dispatch(removeTask(id));
    if (removeTask.fulfilled.match(response)) {
      await dispatch(getTasks(paramTask));
    } else {
      alert("error");
    }
  };
  
  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            checked={pendingRemoveTasks.includes(data.id)}
            onChange={() => {
              reTasks(data.id);
            }}
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
            isDisabled={data.status === "COMPLETED"}
            onChange={setCateOfTask}
          />
        </td>
        <td> {data?.createdAt}</td>
        <td>{data?.updatedAt}</td>
        <td>
          <input
            type="checkbox"
            checked={data.status === "COMPLETED"}
            onChange={handleCompleted}
          ></input>
        </td>
        <td>
          {data.status == "IN_PROGRESS" && (
            <span>
              <MDBBtn
                color="success"
                rounded
                size="sm"
                onClick={() => {
                  setEdittask(!editTask);
                }}
              >
                Edit
              </MDBBtn>
            </span>
          )}
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

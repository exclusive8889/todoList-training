import React, { useMemo, useState, memo, useEffect, useRef } from "react";
import Select from "react-select";
import { MDBBtn } from "mdb-react-ui-kit";

import { useSelector, useDispatch } from "react-redux";
import { updateTask, removeTask, getTasks } from "../../stores/slice/taskSlice";
import { useCallback } from "react";
import { STATUS } from "./constants";

function Tasks({ data, reTasks, pendingRemoveTasks }) {
  const dispatch = useDispatch();

  const [editTask, setEdittask] = useState(false);
  const [cateOfTask, setCateOfTask] = useState();
  const [valueInputTask, setValueInputTask] = useState(data.title);

  const formatDate = useCallback((date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      "  " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  }, []);

  const date = {
    createdAt: formatDate(new Date(data?.createdAt)),
    updatedAt: formatDate(new Date(data?.updatedAt)),
  };

  const [defaultCate] = useState(
    data?.categories.map((item) => ({
      value: item.id,
      label: item.name,
    }))
  );

  const { paramTask, listCategories } = useSelector((state) => ({
    paramTask: state.filterSlice.paramTask,
    listCategories: state?.categories?.list,
  }));

  const inputEditRef = useRef();
  const dataUpdateTask = useRef({
    title: data.title,
    categoryIds: data.categories.map((list) => list.id),
    status: data.status,
  });

  const listCate = useMemo(() => {
    if (data.status === STATUS.COMPLETED) return [];
    const list = listCategories?.map((item, index) => ({
      value: item.id,
      label: item.name,
    }));
    return list;
  }, [data.status, listCategories]);

  const handleUpdateTask = useCallback(
    async (data, id) => {
      const response = await dispatch(updateTask({ id: id, datatask: data }));
      if (updateTask.fulfilled.match(response)) {
        dispatch(getTasks(paramTask));
      } else {
        alert("error");
      }
    },
    [dispatch, paramTask]
  );

  const handleChangeCategory = useCallback(() => {
    if (!cateOfTask) return;
    dataUpdateTask.current = {
      ...dataUpdateTask.current,
      categoryIds: cateOfTask.map((list) => list.value),
    };
    handleUpdateTask(dataUpdateTask.current, data.id);
  }, [cateOfTask, data.id, handleUpdateTask]);

  useEffect(() => {
    handleChangeCategory();
  }, [cateOfTask, data.id, handleChangeCategory]);

  const updateTitleTask = async () => {
    dataUpdateTask.current = {
      ...dataUpdateTask.current,
      title: valueInputTask,
    };
    await handleUpdateTask(dataUpdateTask.current, data.id);
    setEdittask(false);
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
            options={listCate}
            className="basic-multi-select"
            classNamePrefix="select"
            isDisabled={data.status === STATUS.COMPLETED}
            onChange={setCateOfTask}
          />
        </td>
        <td> {date.createdAt}</td>
        <td>{date.updatedAt}</td>
        <td>
          <input
            type="checkbox"
            checked={data.status === STATUS.COMPLETED}
            onChange={handleCompleted}
          ></input>
        </td>
        <td>
          {data.status === STATUS.IN_PROGRESS && (
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

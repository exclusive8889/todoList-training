import React, { useMemo, useState, memo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { updateTask } from "../../stores/slice/taskSlice";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
function Tasks({ data,handleUpdateTask }) {
  const dispatch = useDispatch();
  const listCategories = useSelector((state) => state?.categories?.list[0]);
  // const [status,setStatus]=useState(data.status)
  const dataUpdateTask = useRef({
    title: data.title,
    categoryIds: [data?.categories.map((item, index) => item.id)],
    status: data.status,
  });




  const [defaultCate, setDefaultCate] = useState(
    data?.categories.map((item, index) => ({
      value: item.id,
      label: item.name,
    }))
  );
  const listcate = useMemo(() => {
    const list = listCategories?.map((item, index) => ({
      value: item.id,
      label: item.name,
    }));
    return list;
  }, [listCategories]);





  useEffect(() => {
    dataUpdateTask.current = {
      ...dataUpdateTask.current,
      categoryIds: defaultCate.map((list) => list.value),
    };
  }, [defaultCate]);
  
  useEffect(() => {

    handleUpdateTask(dataUpdateTask.current)
    // if (dataUpdateTask.current.status == "COMPLETED") return;
    // dispatch(updateTask({ id: data.id, datatask: dataUpdateTask.current }));
  }, [dataUpdateTask.current]);

  // const handleCompleted = () => {
    
  //   data.status == "COMPLETED"
  //     ? (dataUpdateTask.current = {
  //         ...dataUpdateTask.current,
  //         status: "IN_PROGRESS",
  //       })
  //     : (dataUpdateTask.current = {
  //         ...dataUpdateTask.current,
  //         status: "COMPLETED",
  //       });
  // };
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
            onChange={setDefaultCate}
          />
        </td>
        <td> {data?.createdAt}</td>
        <td>{data?.updatedAt}</td>
        <td>
          <input
            type="checkbox"
            checked={data.status === "COMPLETED"}
            // onChange={handleCompleted}
          ></input>
        </td>
        <td>
          <span>
            <MDBBtn color="success" rounded size="sm">
              Edit
            </MDBBtn>
          </span>
          <MDBBtn color="danger" rounded size="sm">
            Delete
          </MDBBtn>
        </td>
      </tr>
    </>
  );
}

export default memo(Tasks);

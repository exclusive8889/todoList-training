import React, { useMemo, useState ,memo} from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
function Tasks({ data }) {
  const [defaultCate, setDefaultCate] = useState(
    data?.categories.map((item, index) => ({
      value: item.name,
      label: item.name,
    }))
  );
  const listCategories = useSelector((state) => state?.categories?.list[0]);
  const listcate = useMemo(() => {
    // console.log('tinh lai')
    const list = listCategories?.map((item, index) => ({
      value: item.name,
      label: item.name,
    }));
    return list;
  }, [listCategories]);
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
          />
        </td>
        <td> {data?.createdAt}</td>
        <td>{data?.updatedAt}</td>
        <td>
          <input type="checkbox"></input>
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

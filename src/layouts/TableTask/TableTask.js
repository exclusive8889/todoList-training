import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

export default function TableTask() {
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
        <tr>
          <td>
            <input type="checkbox"></input>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <p>ghgh</p>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1">Software engineer</p>
            <p className="text-muted mb-0">IT department</p>
          </td>
          <td>
            <MDBBadge color="success" pill>
              Active
            </MDBBadge>
          </td>
          <td>Senior</td>
          <td>
            <MDBBtn color="link" rounded size="sm">
              Edit
            </MDBBtn>
          </td>
          <td>
          
          <span
      
          >
            <FontAwesomeIcon icon={faPen} />
          </span>
          <span >
            <FontAwesomeIcon icon={faTrash} />
          </span>

      </td>
        </tr>
       
      </MDBTableBody>
    </MDBTable>
  );
}

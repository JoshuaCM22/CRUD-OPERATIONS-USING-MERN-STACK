import { React, Component } from "react";
import { ROOTURL } from "../Shared/Utility";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    this.getAllEmployees();
  }

  componentDidUpdate() {
    this.getAllEmployees();
  }

  render() {
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>
                <h1 id="titleOfList">Employee List</h1>
              </th>
            </tr>
            <tr>
              <th>Full Name</th>
              <th>Position</th>
              <th>Mobile No</th>
            </tr>
          </thead>

          <tbody>
            {this.state.employees.map((employee) => (
           
              <tr
                key={employee._id}
                onClick={(e) => this.getTheEmployeeID(e, employee._id)}
              >
                <td>{employee.Full_Name}</td>
                <td>{employee.Position}</td>
                <td>{employee.Mobile_No}</td>
                <td>
                  <button
                    onClick={(e) => this.onDelete(e, employee._id)}
                    className="btn btn-sm btn-danger"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // ----------------------------- USER DEFINED FUNCTIONS -----------------------------
  getAllEmployees = () => {
    let getEmployeesArray = [];
    axios.get(ROOTURL).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        getEmployeesArray.push(response.data[i]);
      }
      this.setState({ employees: getEmployeesArray });
    });
  };

  getTheEmployeeID = (e, id) => {
    e.stopPropagation();
    this.props.getEmployeeInfo(id , "get");
  };

  onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete(`${ROOTURL}/${id}`)
        .then(() => {
          this.props.getEmployeeInfo(0 , "delete");
          toast.info("\u2713 Successfully deleted", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        })
        .catch((error) => console.log(`ERROR MESSAGE IS: ${error.data}`));
    }
  };
  // ----------------------------- USER DEFINED FUNCTIONS -----------------------------
}

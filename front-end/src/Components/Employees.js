import { React, Component } from "react";
import Employee from "./Employee";
import EmployeesList from "./EmployeeList";

export default class Employees extends Component {
  constructor() {
    super();
    this.state = {
      employeeID: 0,
      employeeStatus: "nothing",
    };
  }

  render() {
    return (
      <div className="jumbtron">
        <div id="mainTitle">CRUD Operations Using MERN Stack</div>
        <hr />
        <div className="row">
          <div className="col-md-5">
            <Employee
              employeeID={this.state.employeeID}
              employeeStatus={this.state.employeeStatus}
              getEmployeeInfo={this.getEmployeeInfo}
            />
          </div>
          <div className="col-md-7">
            <EmployeesList getEmployeeInfo={this.getEmployeeInfo} />
          </div>
        </div>
      </div>
    );
  }
  // ----------------------------- USER DEFINED FUNCTION -----------------------------
  getEmployeeInfo = (id, status) => {
    this.setState({ employeeID: id });
    this.setState({ employeeStatus: status });
  };
  // ----------------------------- USER DEFINED FUNCTION -----------------------------
}

import { React, Component } from "react";
import { ROOTURL } from "../Shared/Utility";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitButtonDisabled: true,
      fullName: {
        value: "",
        isTouched: false,
        isValid: false,
        errors: "",
      },
      position: {
        value: "",
        isTouched: false,
        isValid: false,
        errors: "",
      },
      mobileNo: {
        value: "",
        isTouched: false,
        isValid: false,
        errors: "",
      },
      currentSelectedEmployeeID: 0,
      isUpdated: false
    };

    const validationRule = {
      required: (val) => val !== null && val !== undefined && val !== "",
    };

    this.formValidationRules = {
      fullName: [
        {
          rule: validationRule.required,
          message: "Full Name is required.",
        },
      ],
      position: [
        {
          rule: validationRule.required,
          message: "Position is required.",
        },
      ],
      mobileNo: [
        {
          rule: validationRule.required,
          message: "Mobile No is required.",
        },
      ],
    };

    this.fields = ["fullName", "position", "mobileNo"];
  }

  componentDidMount() {
    this.validateForm();
  }

  componentDidUpdate() {
    if (this.props.employeeStatus === "delete") {
      this.clearTheForm();
    } else if (this.props.employeeStatus === "get") {
      this.getTheInfoOfOneEmployee(this.props.employeeID);
    }
  }

  render() {
    // Destructuring Assignment in object called state
    const { fullName, position, mobileNo } = this.state;
    return (
      <div>
        <form id="form" autoComplete="off">
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="fullName"
              className="form-control"
              value={fullName.value}
              onChange={this.handleFieldChange}
              onBlur={this.handleSetTouched}
            />

            {fullName.isTouched === true &&
              fullName.isValid === false &&
              fullName.errors.length > 0 &&
              fullName.errors.map((errorMessage, x) => (
                <div key={x} className="validation-error">
                  {errorMessage}
                </div>
              ))}
          </div>

          <div className="form-group">
            <label>Position</label>
            <input
              name="position"
              className="form-control"
              value={position.value}
              onChange={this.handleFieldChange}
              onBlur={this.handleSetTouched}
            />

            {position.isTouched === true &&
              position.isValid === false &&
              position.errors.length > 0 &&
              position.errors.map((errorMessage, x) => (
                <div key={x} className="validation-error">
                  {errorMessage}
                </div>
              ))}
          </div>

          <div className="form-group">
            <label>Mobile No</label>
            <input
              name="mobileNo"
              className="form-control"
              value={mobileNo.value}
              onChange={this.handleFieldChange}
              onBlur={this.handleSetTouched}
            />

            {mobileNo.isTouched === true &&
              mobileNo.isValid === false &&
              mobileNo.errors.length > 0 &&
              mobileNo.errors.map((errorMessage, x) => (
                <div key={x} className="validation-error">
                  {errorMessage}
                </div>
              ))}
          </div>

          <div className="form-group">
            <button
              id="submitButton"
              className="btn btn-lg btn-primary"
              disabled={this.state.submitButtonDisabled}
              onClick={(e) => {
                this.submitButtonClicked(e);
              }}
            >
              Submit
            </button>

            <button
              className="btn btn-lg btn-danger"
              onClick={this.clearTheForm}
            >
              Clear
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    );
  }
  // ----------------------------- USER DEFINED FUNCTIONS -----------------------------
  validateForm = (newState) => {
    // Check if parameter called newState have value or not
    newState = newState || { ...this.state };
    let interval = 0;
    this.fields.forEach((fieldName) => {
      let newField = newState[fieldName];
      newField.errors = [];
      newField.isValid = true;

      if (newField.value !== "") {
        if (interval <= 3) {
          interval++;
        }
      }

      this.formValidationRules[fieldName].forEach((vRule) => {
        // Check if the property called errors is empty
        if (!vRule.rule(this.state[fieldName].value)) {
          // Insert the error messages from the object called formValidationRules in the state object
          newField.errors.push(vRule.message);
          newField.isValid = false;
        }
        newState[fieldName] = newField;
      });
    });

    // Change all properties in the object called state
    this.setState(newState);
    // Change the value of property called submitButtonDisabled in the state object
    interval === 3
      ? this.setState({ submitButtonDisabled: false })
      : this.setState({ submitButtonDisabled: true });
  };

  handleFieldChange = (e) => {
    let newState = { ...this.state };
    newState[e.target.name].value = e.target.value;
    this.validateForm(newState);
  };

  handleSetTouched = (e) => {
    let field = { ...this.state[e.target.name], isTouched: true };
    this.setState({ [e.target.name]: { ...field } });
  };

  getTheInfoOfOneEmployee = (id) => {
    if (id !== 0) {
      if (
        this.state.currentSelectedEmployeeID === 0 ||
        this.state.currentSelectedEmployeeID !== id ||
        this.state.isUpdated === true
      ) {
        this.setState({ isUpdated: false });
        this.setState({ currentSelectedEmployeeID: id });
        axios.get(`${ROOTURL}/${id}`).then((response) => {
          this.fillUpTheInfoInEachTextbox(response.data);
        });
      }
    }
  };

  fillUpTheInfoInEachTextbox(employeeData) {
    const {
      Full_Name: fullNameValue,
      Position: positionValue,
      Mobile_No: mobileNoValue,
    } = employeeData;

    this.setState((previousState) => ({
      fullName: {
        ...previousState.fullName,
        value: fullNameValue,
      },
      position: {
        ...previousState.position,
        value: positionValue,
      },
      mobileNo: {
        ...previousState.mobileNo,
        value: mobileNoValue,
      },
    }));

    let newField = {};
    let newState = { ...this.state };
    this.fields.forEach((fieldName) => {
      newField = newState[fieldName];
      newField.isTouched = true;
      newField.isValid = true;
    });

    this.setState(newField);

    this.props.employeeID !== 0
      ? this.setState({ submitButtonDisabled: false })
      : this.setState({ submitButtonDisabled: true });
  }

  submitButtonClicked = (e) => {
    this.props.employeeStatus === "get"
      ? this.updateExistingEmployee(e)
      : this.insertNewEmployee();
  };

  insertNewEmployee = () => {
    let newEmployee = this.getAllValuesOfEachTextbox();
    axios
      .post(`${ROOTURL}/`, newEmployee)
      .then(() => {
        toast.info("\u2713 Successfully added", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      })
      .catch((error) => console.log(`ERROR MESSAGE: ${error.data}`));
  };

  updateExistingEmployee = (e) => {
    // To prevent of refreshing the page
    e.preventDefault();
    let newEmployee = this.getAllValuesOfEachTextbox();
    // Add new property called ID to the object called newEmployee
    newEmployee.ID = this.state.currentSelectedEmployeeID;
    axios
      .put(
        `${ROOTURL}/${this.state.currentSelectedEmployeeID.toString()}`,
        newEmployee
      )
      .then(() => {
        this.props.getEmployeeInfo(0, "nothing");
        this.setState({ isUpdated: true });
        this.props.employeeID !== 0
          ? this.setState({ submitButtonDisabled: false })
          : this.setState({ submitButtonDisabled: true });
        toast.info("\u2713 Successfully updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      })
      .catch((error) => console.log(`ERROR MESSAGE: ${error.data}`));
  };

  getAllValuesOfEachTextbox = () => {
    let newEmployee = { Full_Name: "", Position: "", Mobile_No: "" };
    // This array will get all the values of each textbox
    let values = [];
    let current = { ...this.state };
    this.fields.forEach((fieldName) => {
      // Add each values of object called current to the array called values
      values.push(current[fieldName].value);
    });

    let interval = 0;
    for (let item in newEmployee) {
      newEmployee[item] = values[interval];
      interval++;
    }
    this.clearTheForm();
    return newEmployee;
  };

  clearTheForm = () => {
    let newField = {};
    let newState = { ...this.state };
    this.fields.forEach((fieldName) => {
      newField = newState[fieldName];
      newField.value = "";
      newField.isTouched = false;
      newField.isValid = false;
    });

    // Change all properties in the object called state
    this.setState(newField);
    this.props.getEmployeeInfo(0, "nothing");
    this.props.employeeID !== 0
      ? this.setState({ submitButtonDisabled: false })
      : this.setState({ submitButtonDisabled: true });
  };
  // ----------------------------- USER DEFINED FUNCTIONS -----------------------------
}

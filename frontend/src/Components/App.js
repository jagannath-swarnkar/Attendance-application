import React from "react";
import "./App.css";
import { Card, Button, NativeSelect } from "@material-ui/core";
import Header from "./Header";
import Axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { studentData } from "../Actions";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const maindata = useSelector(state => state.StudentData);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = React.useState(true);
  const [isValidUser, setValidUser] = React.useState(true);
  const [noData, setNoData] = React.useState(false)

  React.useEffect(() => {
    var token = reactLocalStorage.get("token");

    // fetching student data from db
    Axios.get("http://localhost:8010/getStudentData", {
      params: { data: token }
    })
      .then(res => {
        setNoData(res.data.length === 0)
        if (res.data === "invalidToken") {
          reactLocalStorage.clear();
          setValidUser(false);
        }
        if (res.data.category.trim() === "teacher") {
          setDisabled(false);
        }
        
        dispatch(studentData("GET_STUDENT_DATA", res.data.students));
      })
      .catch(err => console.error(err));
  }, [dispatch]);

  const selectHandler = (e, email) => {
    Axios.post("http://localhost:8010/attendance", {
      attendance: { email: email, status: e.target.value }
    })
      .then(res => {
        dispatch(studentData("GET_STUDENT_DATA", res.data));
      })
      .catch(err => console.error(err));
  };

  if (!reactLocalStorage.get("token") || !isValidUser) {
    return <Redirect to="/login" />;
  }

  const noStudent = () => {
    if (noData) {
      return (
        <div style={{textAlign:'center', color:'grey'}}>
          <h1>No Student is available</h1>
        </div>
      );
    }
  };
  return (
    <div>
      <Header />
      <div className="container">
        {maindata.map((item, i) => {
          return (
            <Card key={i} className="single-card">
              <div className="no">{i + 1}.</div>
              <hr />
              <div className="student-name">{item.username}</div>
              <hr />
              <Button style={{ background: "aliceblue" }}>
                <NativeSelect
                  disableUnderline
                  onChange={e => selectHandler(e, item.email)}
                  value={item.status}
                  disabled={disabled}
                  style={{ width: "170px", color: "red", fontWeight: "bold" }}
                >
                  <option value="" />
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </NativeSelect>
              </Button>
            </Card>
          );
        })}
        {noStudent()}
      </div>
    </div>
  );
}

export default App;

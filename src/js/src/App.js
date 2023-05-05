import { Fragment, useEffect } from "react";
import { useState } from "react";
import { Avatar, Table, Spin, Modal } from "antd";
import "./App.css";
import { getAllStudents } from "./client";
import Container from "./Container";
import Footer from "./Footer";
import Welcome  from "./Pages/Welcome"
import AddStudentForm from "./forms/AddStudentForm";
function App() {
  const [students, setStudents] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsFetched(true);
    getAllStudents()
      .then((res) =>
        res.json().then((students) => {
          setStudents(students);
          setIsFetched(false);
        })
      )
      .catch((error) => {
        console.log(error.message);
        setIsFetched(false);
      });
  }, []);

  const toggleModalHandler = () => {
    setIsModalVisible(!isModalVisible);
  };

  const showAllStudents = () => {
    if (isFetched) {
      <Container>
        <Spin />
      </Container>;
    }

    if (students && students.length && !isFetched) {
      const columns = [
        {
          title: "",
          key: "avatar",
          render: (text, student) => (
            <Avatar size="large">
              {`${student.firstName.charAt(0).toUpperCase()}${student.lastName
                .charAt(0)
                .toUpperCase()}`}
            </Avatar>
          ),
        },
        {
          title: "StudentId",
          dataIndex: "studentId",
          key: "studentId",
        },
        {
          title: "First Name",
          dataIndex: "firstName",
          key: "firstName",
        },
        {
          title: "Last Name",
          dataIndex: "lastName",
          key: "lastName",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Gender",
          dataIndex: "gender",
          key: "gender",
        },
      ];
      return (
        <Container>

          <Table
            style={{ marginBottom: "100px" }}
            dataSource={students}
            columns={columns}
            rowKey="studentId"
            pagination={false}
          />
        </Container>
      );
    }
    return (
      <Container>
        <h1>No Student Found!</h1>
      </Container>
    );
  };

  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <Fragment>
      <div>
      <Welcome/>

        <div className="list">{showAllStudents()}</div>
        <Modal
          title="Add a new Student"
          open={isModalVisible}
          onOk={toggleModalHandler}
          onCancel={toggleModalHandler}
          width={1000}
        >
          <AddStudentForm
            onSuccess={() => {
              setIsModalVisible(false);
              reloadPage();
            }}
           
          />
        </Modal>
        <Footer
          toggleModalHandler={toggleModalHandler}
          numberOfStudents={students.length}
        />
      </div>
    </Fragment>
  );
}

export default App;

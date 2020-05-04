import React, { useState } from 'react';
import axios from 'axios';
import Student from './Student';

const py = {
  margin: '0 0 10px 0'
};

const Students = () => {
  const initialFormValue = {
    name: '',
    age: '',
    phoneNumber: ''
  };

  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(initialFormValue);

  const fetchData = async () => {
    const result = await axios.get('http://localhost:8000/students');
    setStudents(result.data);
  };

  const { name, age, phoneNumber } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name,
      age,
      phoneNumber
    };

    await axios.post('http://localhost:8000/students', body);
    fetchData();
    setFormData(initialFormValue);
  };

  const renderContent = () => {
    return students.map((student) => (
      <Student
        key={student.id}
        id={student.id}
        name={student.name}
        age={student.age}
        phoneNumber={student.phoneNumber}
      />
    ));
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={handleChange}
              style={py}
            />
          </div>
          <label htmlFor="age" className="col-sm-2 col-form-label">
            Age
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="age"
              className="form-control"
              value={age}
              onChange={handleChange}
              style={py}
            />
          </div>
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Phone No.
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              value={phoneNumber}
              onChange={handleChange}
              style={py}
            />
          </div>
        </div>
        <button className="btn btn-success btn-lg btn-block" style={py}>
          ADD
        </button>
      </form>
      <button
        type="button"
        className="btn btn-primary btn-lg btn-block"
        onClick={fetchData}
      >
        FETCH STUDENTS
      </button>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Phone No.</th>
          </tr>
        </thead>
        <tbody>{renderContent()}</tbody>
      </table>
    </div>
  );
};

export default Students;

import React from 'react';

const Student = ({ id, name, age, phoneNumber, deleteStudent, isLogin }) => {
  return (
    <>
      <tr>
        <th scope="row">{id}</th>
        <td>{name}</td>
        <td>{age}</td>
        <td>{phoneNumber}</td>
        <td>
          <button className="btn btn-info">Edit</button>
        </td>
        <td>
          {isLogin ? (
            <button
              className="btn btn-danger"
              onClick={() => deleteStudent(id)}
            >
              Delete
            </button>
          ) : null}
        </td>
      </tr>
    </>
  );
};

export default Student;

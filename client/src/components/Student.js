import React from 'react';

const Student = ({ id, name, age, phoneNumber }) => {
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
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    </>
  );
};

export default Student;

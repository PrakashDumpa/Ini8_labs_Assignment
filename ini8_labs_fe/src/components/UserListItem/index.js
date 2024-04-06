import React from "react";

const UserListItem = ({ eachUser }) => {
  return (
    <tr>
      <td>{eachUser?.id}</td>
      <td>{eachUser?.name}</td>
      <td>{eachUser?.email}</td>
      <td>{eachUser?.date_of_birth}</td>
      <td>
        <button type="button" className=" border-0 bg-white">
          {eachUser.edit}
        </button>
      </td>
      <td>
        <button type="button" className=" border-0 bg-white">
          {eachUser.delete}
        </button>
      </td>
    </tr>
  );
};

export default UserListItem;

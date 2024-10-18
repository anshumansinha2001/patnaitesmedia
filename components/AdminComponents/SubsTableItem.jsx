import moment from "moment";
import React from "react";

const SubsTableItem = ({ email, updatedAt, _id, deleteEmail }) => {
  const formatDate = moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a");
  return (
    <tr className="bg-white border-b text-left">
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        {email || "No Email"}
      </th>
      <td className="px-6 py-4">{formatDate || "NO Date"}</td>
      <td
        onClick={() => deleteEmail(_id)}
        className="px-6 py-4 cursor-pointer font-extrabold"
      >
        X
      </td>
    </tr>
  );
};

export default SubsTableItem;

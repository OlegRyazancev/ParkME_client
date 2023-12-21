import React from 'react';
import cl from "./Admin.module.css";
import {Link} from "react-router-dom";

const AdminUsersTable = ({users, onDelete}) => {

    const sortedUsers = [...users].sort((a, b) => a.id - b.id);

    return (
        <div className={cl.itemsContainer}>
            <p className={cl.propHeader}>Users</p>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {sortedUsers.map((user, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <Link className={cl.lnk} to={`/profile/${user.id}`}>
                                {user.name}
                            </Link>
                        </td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => onDelete(user.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsersTable;
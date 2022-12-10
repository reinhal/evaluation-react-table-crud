import React from 'react'; 
import UserRow from './UserRow';
import '../index.css'

export const UserTable = ({data}) => {
    return (
        <div className='table-div'>
            <div className="table-header">
                <h2 className="title">Users</h2>
                <button className="delete-button">Delete</button>
            </div>
            <table>
                <thead>
                    <tr className="table-row">
                        <th></th>
                        <th>EMAIL</th>
                        <th>NAME</th>
                        <th>ROLE</th>
                    </tr>
                </thead>
                <tbody>
                    {data.allUsers.map((user, index) => (
                        <UserRow key={index} email={user.email} name={user.name} role={user.role} index={index}  />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserTable;
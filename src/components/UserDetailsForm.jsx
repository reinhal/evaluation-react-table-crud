import React, {useContext} from 'react';
import { UserContext } from '../UserContext';
import { roleList, roleHelper } from '../util';
import "../index.css"

export const UserDetailsForm = () => {
    const {currentUser} = useContext(UserContext)
 
    return (
        <div className="table-div">
            <form className="form-spacing">
                <div className="table-header form-header">
                    <h1 className="email-title">{currentUser.email}</h1>
                    <button className="save" type="submit">Save</button>
                </div>
                <div className="form-body">
                    <div className="form-item-1"> 
                        <label className="form-label-1">Name</label>
                        <input className="name-value" type="text" name="user-name" value={currentUser.name} />
                    </div>
                    <div className="vertical-divider"></div>
                    <div className="form-item-2 ">
                        <label className="form-label-2">Role</label>
                        {roleList.map((role, index) => (
                            <li className="role-list" key={index}>
                                <input className="role-input" type="radio" id={role} name="role" value={role} checked={roleHelper(currentUser.role) === role} />
                                <label className="role-label">{role}</label>
                            </li>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserDetailsForm; 
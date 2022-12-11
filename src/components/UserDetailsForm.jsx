import React, {useContext, useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { UserContext } from '../UserContext';
import { roleList, roleHelper, roleListHelper } from '../util';
import "../index.css"

export const UserDetailsForm = () => {
    const {currentUser} = useContext(UserContext); 
    const [userState, setUserState] = useState({
      name: currentUser.name,
      role: roleHelper(currentUser.role)
    })

    const checkTheRoleOfCurrentUser = (roleList) => {
      return roleList.map(roleListItem => ({...roleList, role: roleListItem, checked: roleHelper(currentUser.role) === roleListItem }))
    }
    const [checkedList, setCheckedList] = useState(checkTheRoleOfCurrentUser(roleList));

    const toggleCheckedRole = (curIndex, checked) => {
      return roleList.map((roleListItem, index) => (curIndex === index ? {...roleListItem, role: roleListItem, checked} : {...roleListItem, role: roleListItem}))
    }

    const changeList = (curIndex, checked) => {
      setCheckedList(checkedList => 
        toggleCheckedRole(checkedList, curIndex, checked)
      );
    };


    const UPDATE_USER_MUTATION = gql`
      mutation UpdateUserMutation($email: ID!, $newAttributes: UserAttributesInput!) {
        updateUser(email: $email, newAttributes: $newAttributes) {
          email
          name 
          role
        }
      }
    `
    const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
        variables: {
          email: currentUser.email,
          newAttributes: {
            name: userState.name,
            role: roleListHelper(userState.role)
          }
        },
        onCompleted: () => {
          alert('User was successfully updated.')
        },
        onError: (error) => {
          alert(`Error updating user: ${error.message}`)
        }
      })

    return (
        <div className="form-div">
            <form 
              className="form-spacing" 
              onSubmit={e => {
                e.preventDefault()
                updateUser()
              }}
            >
                <div className="table-header form-header">
                    <h1 className="email-title">{currentUser.email}</h1>
                    <button className="save" type="submit" >Save</button>
                </div>
                <div className="form-body">
                    <div className="form-item-1"> 
                        <label className="form-label-1">Name</label>
                        <input className="name-value" type="text" name="user-name" value={userState.name} onChange={e => setUserState({...userState, name: e.target.value})} />
                    </div>
                    <div className="vertical-divider"></div>
                    <div className="form-item-2 ">
                        <label className="form-label-2">Role</label>
                        {checkedList.map(({role, checked}, index) => (
                            <li className="role-list" key={index}>
                                <input 
                                  className="role-input" 
                                  type="radio" 
                                  id={role} 
                                  name="role" 
                                  value={role} 
                                  checked={checked} 
                                  onChange={e => {
                                    changeList(index, e.target.checked)
                                    setUserState({...userState, role: e.target.value})
                                  }}
                                />
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
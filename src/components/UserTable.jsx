import React, {useContext, useEffect, useState} from 'react'; 
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { UserContext } from '../UserContext';
import { roleHelper } from '../util';
import '../index.css'

export const UserTable = ({data}) => {
    const {isChecked, setCurrentUser} = useContext(UserContext)
    const [checkedUsers, setCheckedUsers]  = useState(
      new Array(data.allUsers.length).fill(false)
    )
    let usersToDelete = []
    
    const handleDeleteButton = () => {
      if (usersToDelete.length > 0) {
        return 'delete-button delete-button-checked'
      } else {
        return 'delete-button'
      }
    }

    const handleEmailLink = (isUserChecked) => {
      if (isUserChecked) {
        return 'email-link-checked'
      } else {
        return 'email-link'
      }
    }
    
    const handleCheckbox = (position) => {
      const updatedCheckedUsers = checkedUsers.map((check, index) => 
        index === position ? !check : check
      );
      setCheckedUsers(updatedCheckedUsers);
    }

    checkedUsers.map((cu, curIndex) => {
      if(cu === true) {
        const localUserToDelete = data.allUsers.filter((user, index) => {
          if(index === curIndex) {
            return user
          }
          return; 
        })
        usersToDelete.push(localUserToDelete[0].email)
      }
      return; 
    }); 

    useEffect(() => {
      handleDeleteButton()
      handleEmailLink()
    }, [isChecked, handleDeleteButton]); 

    const DELETE_USERS_MUTATION = gql`
      mutation DeleteUsersMutation($emails: [ID]!) {
        deleteUsers(emails: $emails)
      }
    `; 

    const [deleteUsers] = useMutation(DELETE_USERS_MUTATION, {
      variables: {
        emails: usersToDelete
      }, 
      onCompleted: () => {
          alert('User(s) successfully deleted.')
        },
        onError: (error) => {
          alert(`Error deleting user(s): ${error.message}`)
        }
    }); 

    return (
        <div className='table-div'>
            <form
              onSubmit={e => {
                e.preventDefault()
                deleteUsers()
              }}
            >
            <div className="table-header">
                <h2 className="title">Users</h2>
                <button className={handleDeleteButton()} type="submit">Delete</button>
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
                    {data.allUsers.map((user, index) => {
                      return (
                        <tr className="table-row" key={index}>
                            <td><label><input name="select-user" type="checkbox" value={user.email} checked={checkedUsers[index]} onChange={() => handleCheckbox(index)}/></label></td>
                            <td className="email">
                                <Link className={handleEmailLink(checkedUsers[index])} to={`/user-details/${index}`} onClick={() => setCurrentUser(user)}>
                                    {user.email}
                                </Link>
                            </td>
                            <td>{user.name}</td>
                            <td>{roleHelper(user.role)}</td>
                        </tr>
                      )
                    })}
                </tbody>
            </table>
            </form>
        </div>
    )
}; 

export default UserTable;
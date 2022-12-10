import React, {useContext} from 'react'; 
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { roleHelper } from '../util';
import '../index.css'

export const UserRow = ({index, email, name, role}) => {
    const {setIsChecked, setCurrentUser, setSelectedUsers} = useContext(UserContext)

    const handleCheckBox = () => {
        setIsChecked(true)
        setSelectedUsers({index, email, name, role})
    }

    return (
        <tr className="table-row" key={index}>
            <td><label><input name="select-user" type="checkbox" value={email} onClick={() => handleCheckBox()}/></label></td>
            <td className="email">
                <Link className="email-link" to={`/user-details/${index}`} onClick={() => setCurrentUser({email, name, role})}>
                    {email}
                </Link>
            </td>
            <td>{name}</td>
            <td>{roleHelper(role)}</td>
        </tr>
    )
}

export default UserRow
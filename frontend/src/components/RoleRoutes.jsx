import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";


const RoleRoutes = ({ role, children }) => {

    const {user} = useSelector(state => state.auth);

    if(role !== user.role) {
        return <Navigate to="/"/>
    }


  return children
}

export default RoleRoutes

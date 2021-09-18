import { logout } from '../service/AuthService'
import { getUser } from '../service/StorageService'
import { Link } from 'react-router-dom';

const UserDashboard = () => {


    return (
        <div>
            <p>Welcome <b>{JSON.parse(getUser()).sub}</b> to the <b>{JSON.parse(getUser()).auth}</b> dashboard! </p>
            <button className="btn btn-danger" onClick={() => logout()}> <Link to='/' style={{textDecoration: 'none', color: 'white'}}> Logout </Link></button>
            <br />
            <br />
            <Link to='/'>Go Home</Link>
        </div>
    )
}

export default UserDashboard
        
import { useState, useEffect, useContext } from "react";
import { ajax } from "rxjs/ajax";
import Models from "../helpers/Models";
import {BehaviorSubject} from "rxjs";
import { API_ROOT } from "../App";

const UserService = () => {

    type User = Models['User'];

    const [users, setUsers] = useState<User[]>([]);

    let userSubject = new BehaviorSubject<User[] | null>(null);

    useEffect(() => {
        ajax.getJSON(API_ROOT + '/user').subscribe((res: any) =>{
            setUsers(res);
        })
    
        userSubject.next([...users]);
    
    }, [])
    

    const getUsers = () => {
        console.log(users);
        return userSubject;
    }

    const addUser = (user: User) => {
        ajax.post(API_ROOT + '/user', user).subscribe((res: any) =>{
            setUsers([...users, res]);
            userSubject.next([...users]);
        })
    }

    const deleteUser = (id: number) => {
        ajax.delete(`${API_ROOT}/user/${id}`).subscribe((res: any) =>{
            setUsers(users.filter(x => x.id != id));
            userSubject.next([...users]);
        })
    }


    return(
        <>
        {/* <button onClick={() => getUsers()}>
            Clickni me mangupe
        </button> */}
            
        </>
    )


}

export default UserService;
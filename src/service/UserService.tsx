import {useEffect, useState} from "react";
import {ajax} from "rxjs/ajax";
import Models from "../helpers/Models";
import {BehaviorSubject} from "rxjs";

const UserService = () => {

    type User = Models['User'];

    const [users, setUsers] = useState<User[]>([]);

    let userSubject = new BehaviorSubject<User[] | null>(null);

    useEffect(() => {
        ajax.getJSON('/user').subscribe((res: any) =>{
            setUsers(res);
        })
    
        userSubject.next([...users]);
    }, [])
    

    const getUsers = () => {
        console.log(users);
        return userSubject;
    }

    const addUser = (user: User) => {
        ajax.post('/user', user).subscribe((res: any) =>{
            setUsers([...users, res]);
            userSubject.next([...users]);
        })
    }

    const deleteUser = (id: number) => {
        ajax.delete(`/user/${id}`).subscribe((res: any) =>{
            setUsers(users.filter(x => x.id != id));
            userSubject.next([...users]);
        })
    }

}

export default UserService;
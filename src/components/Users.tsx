import axios from 'axios';
import { useEffect, useState } from 'react';

type userDto = {
    id: number
    email: { value: string}
}

function Users() {

    const [data, setData] = useState<userDto[]>();
    const [_, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5293/api/Users')
          .then(response => {
            console.log(response)
            setData(response.data);
          })
          .catch(error => {
            setError(error);
          });
      }, []);

    return (
        <div>
            <div>
                <h2>Users</h2>  
                <button>Create New User</button>
            </div>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Email</th>
                    <th>Email is confirmed</th>
                </tr>
                
                     {data?.map(person => (
                        <tr>
                            <td >{person.id}</td>
                            <td key={person.email.value}>{person.email.value}</td>
                            <td>  <input disabled type="checkbox" checked/> {  true} </td>
                        </tr>
                    ))}
            </table>
        </div>
    );
}


export default Users;

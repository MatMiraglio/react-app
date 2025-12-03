import axios from 'axios';
import { useEffect, useState } from 'react';

type userDto = {
    email: { value: string}
}

function Users() {

    const [data, setData] = useState<userDto[]>();
    const [error, setError] = useState(null);

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
            Users
            {data?.map(person => <li key={person.email.value}>{person.email.value}</li>)}
        </div>
    );
}


export default Users;

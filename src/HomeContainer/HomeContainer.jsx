import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeContainer.css';

function HomeContainer() {

    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch user data from the database or API
        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:3000/api/v1/users'); // Replace with your API endpoint
                const data = await response.json();
                console.log('Fetched users:', data);
                setUsers(data); // Assume data is an array of user objects with id and name
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers();
    }, []);

    function processLogin(userid){
        navigate(`/user/${userid}/schedules`)
    }

    return (
        <div>
            <p>Welcome to Jammer! Please select a user to continue.</p>
            {users.map(user => (
                <button key={user.id} onClick={() => processLogin(user.id)}>
                    {user.name}
                </button>
            ))}
        </div>
    )
}

export default HomeContainer
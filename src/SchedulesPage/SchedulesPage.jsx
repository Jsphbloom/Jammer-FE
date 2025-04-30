import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SchedulesPage.css'

function SchedulesPage(){

    const [schedules, setSchedules] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchSchedules() {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/schedules`);
                const data = await response.json();
                setSchedules(data);
            } catch (err) {
                console.error("Failed to fetch schedules:", err);
            }
        }

        fetchSchedules();
    }, []);

    function goHome() {
        navigate('/');
    }

    return (
        <div>
            <h2>All Schedules</h2>
            <ul>
                {schedules.map(schedule => (
                    <li key={schedule.id}>
                        <details>
                            <summary>{schedule.name}</summary>
                            <ul>
                                {schedule.shows?.length > 0 ? (
                                    schedule.shows.map(show => (
                                        <li key={show.id}>
                                            <details>
                                                <summary>{show.name} — {show.time}</summary>
                                                <div>
                                                    <h4>Attendees:</h4>
                                                    <ul>
                                                        {show.users && show.users.length > 0 ? (
                                                            show.users.map(user => (
                                                                <li key={user.id}>{user.name}</li>
                                                            ))
                                                        ) : (
                                                            <li>No attendees</li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </details>
                                        </li>
                                    ))
                                ) : (
                                    <li>No shows</li>
                                )}
                            </ul>
                        </details>
                    </li>
                ))}
            </ul>
            <button key='home' onClick={() => goHome()}>
                Go Home!
            </button>
        </div>
    );
}

export default SchedulesPage
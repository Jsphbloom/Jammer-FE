import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserScheduleContainer.css'
import ScheduleShows from '../ScheduleShows/ScheduleShows.jsx'

function UserScheduleContainer() {

    const { id } = useParams();
    const [schedules, setSchedules] = useState([])
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    useEffect(() => {
        // Fetch user data from the database or API
        async function fetchSchedules() {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/users/${id}/schedules`); // Replace with your API endpoint
                const data = await response.json();
                console.log('Fetched schedules:', data);
                setSchedules(data); // Assume data is an array of user objects with id and name
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        }

        fetchSchedules();
    }, []);

    function processSchedule(schedule){
        setSelectedSchedule(schedule)
    }

    return (
        <div>
            <p>Here are the schedules.</p>
            <section className="schedule-list">
                {schedules.map(schedule => (
                    <button key={schedule.name} onClick={() => processSchedule(schedule)}>
                        {schedule.name}
                    </button>
                ))}
                <button key='make-new' onClick={() => createSchedule()}>
                    Make new schedule
                </button>
            </section>

            <section className="schedule-builder">
                <ScheduleShows schedules={selectedSchedule}/>
            </section>
        </div>
    )
}

export default UserScheduleContainer
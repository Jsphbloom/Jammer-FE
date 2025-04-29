import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserScheduleContainer.css';
import ScheduleShows from '../ScheduleShows/ScheduleShows.jsx';

function UserScheduleContainer() {
    const { id } = useParams();
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    useEffect(() => {
        async function fetchSchedules() {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/users/${id}/schedules`);
                const data = await response.json();
                console.log('Fetched schedules:', data);
                setSchedules(data);

                if (selectedSchedule) {
                    const updatedSelectedSchedule = data.find(schedule => schedule.id === selectedSchedule.id);
                    setSelectedSchedule(updatedSelectedSchedule || null);
                }
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        }

        fetchSchedules();
    }, [id]);

    function processSchedule(schedule) {
        setSelectedSchedule(schedule);
    }

    function handleShowDeletion(deletedShowId) {
        if (selectedSchedule) {
            const updatedShows = selectedSchedule.shows.filter(show => show.id !== deletedShowId);
            setSelectedSchedule({ ...selectedSchedule, shows: updatedShows });
        }
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
                <button key="make-new" onClick={() => createSchedule()}>
                    Make new schedule
                </button>
            </section>

            <section className="schedule-shows">
                {selectedSchedule ? (
                    <ScheduleShows
                        selectedSchedule={selectedSchedule}
                        onShowDelete={handleShowDeletion}
                    />
                ) : (
                    <p>Select a schedule to begin editing.</p>
                )}
            </section>
        </div>
    );
}

export default UserScheduleContainer;
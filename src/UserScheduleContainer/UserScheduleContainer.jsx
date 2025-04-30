import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserScheduleContainer.css';
import ScheduleShows from '../ScheduleShows/ScheduleShows.jsx';
import { useNavigate } from 'react-router-dom';

function UserScheduleContainer() {
    const { id } = useParams();
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [allShows, setAllShows] = useState([]);
    const [newScheduleShows, setNewScheduleShows] = useState([]);
    const [creatingNewSchedule, setCreatingNewSchedule] = useState(false);
    const [newScheduleName, setNewScheduleName] = useState('');
    const [shows, setShows] = useState(selectedSchedule?.shows || []);

    const navigate = useNavigate()

    useEffect(() => {
        if (selectedSchedule) {
            setShows(selectedSchedule.shows || []);
        }
    }, [selectedSchedule]);

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

    async function processSchedule(schedule) {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/schedules/${schedule.id}/schedule_shows`);
            const data = await response.json();
            setSelectedSchedule({
                ...schedule,
                shows: data,
            });
            setShows(data)
        } catch (err) {
            console.error('Error fetching schedule shows:', err);
        }
    }

    function handleShowDeletion(deletedShowId) {
        if (selectedSchedule) {
            const updatedShows = selectedSchedule.shows.filter(show => show.id !== deletedShowId);
            setSelectedSchedule({ ...selectedSchedule, shows: updatedShows });
        }
    }

    async function createSchedule(){
        try {
            const response = await fetch(`http://localhost:3000/api/v1/shows`);
            const data = await response.json();
            setAllShows(data);
            setNewScheduleShows([]);
            setCreatingNewSchedule(true);
        } catch (error) {
            console.error('Failed to fetch shows:', error)
        }
    }

    function addShowToNewSchedule(show) {
        if (!newScheduleShows.find(s => s.id === show.id)) {
            setNewScheduleShows([...newScheduleShows, show]);
        }
    }

    async function saveNewSchedule() {
        const scheduleResponse = await fetch(`http://localhost:3000/api/v1/users/${id}/schedules`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newScheduleName, show_ids: newScheduleShows.map(s => s.id) })
        });
    
        if (scheduleResponse.ok) {
            const newSchedule = await scheduleResponse.json();
            setSchedules([...schedules, newSchedule]);
            setSelectedSchedule(newSchedule);
            setCreatingNewSchedule(false);
        } else {
            console.error("Failed to save new schedule");
        }
    }

    function goHome() {
        navigate('/');
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
    
                {creatingNewSchedule ? null : (
                    <button key="make-new" onClick={createSchedule}>
                        Make new schedule
                    </button>
                )}
            </section>
    
            {creatingNewSchedule ? (
                <section className="new-schedule">
                    <input
                        type="text"
                        placeholder="Enter schedule name"
                        value={newScheduleName}
                        onChange={(e) => setNewScheduleName(e.target.value)}
                    />
                    <h3>Shows:</h3>
                    {allShows.map(show => (
                        console.log(show.name),
                        <button key={show.id} onClick={() => addShowToNewSchedule(show)}>
                            {show.name} – {show.time}
                        </button>
                    ))}
    
                    <h4>Selected Shows:</h4>
                    <ul>
                        {newScheduleShows.map(show => (
                            <li key={show.id}>{show.name}</li>
                        ))}
                    </ul>
    
                    <button onClick={saveNewSchedule}>Save Schedule</button>
                    <button onClick={() => setCreatingNewSchedule(false)}>Cancel</button>
                </section>
            ) : (
                <section className="schedule-shows">
                    {selectedSchedule ? (
                        <ScheduleShows
                            selectedSchedule={selectedSchedule}
                            setSelectedSchedule={setSelectedSchedule}
                            onShowDelete={handleShowDeletion}
                        />
                    ) : (
                        <p>Select a schedule to begin editing.</p>
                    )}
                </section>
            )}
            <button className='home' onClick={() => goHome()}>
                Go Home!
            </button>
        </div>
    );
}

export default UserScheduleContainer;
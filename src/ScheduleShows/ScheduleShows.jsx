import './ScheduleShows.css';
import { useState, useEffect } from 'react';

function ScheduleShows({ selectedSchedule, onShowDelete }) {
    const [shows, setShows] = useState(selectedSchedule?.shows || []);

    async function handleDeleteShow(scheduleShowId) {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/schedules/${selectedSchedule.id}/schedule_shows/${scheduleShowId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setShows(prevShows => prevShows.filter(show => show.id !== scheduleShowId));

                if (onShowDelete) {
                    onShowDelete(scheduleShowId);
                }
            } else {
                console.error(`Failed to delete show ${scheduleShowId}:`, response.statusText);
            }
        } catch (error) {
            console.error('Error deleting show:', error);
        }
    }

    useEffect(() => {
        setShows(selectedSchedule?.shows || []);
    }, [selectedSchedule]);

    if (!selectedSchedule || !selectedSchedule.shows) {
        return <p>No schedule selected or schedule is missing shows.</p>;
    }

    return (
        <div>
            <p>{selectedSchedule.name}'s shows!</p>
            <section className="show-list">
                {shows.length > 0 ? (
                    shows.map(show => (
                        <button key={show.id} onClick={() => handleDeleteShow(show.id)}>
                            {show.name} – {show.time}
                        </button>
                    ))
                ) : (
                    <p>No shows in the schedule!</p>
                )}
            </section>
        </div>
    );
}

export default ScheduleShows;
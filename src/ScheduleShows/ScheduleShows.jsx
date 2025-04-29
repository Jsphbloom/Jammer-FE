import './ScheduleShows.css';
import { useState, useEffect } from 'react';

function ScheduleShows({ selectedSchedule, onShowDelete }) {
    const [shows, setShows] = useState(selectedSchedule?.shows || []);

    const handleDeleteShow = async (scheduleShowId) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/schedules/${selectedSchedule.id}/schedule_shows/${scheduleShowId}`,
                { method: 'DELETE' }
            );
    
            if (response.ok) {
                setShows(prev => prev.filter(ss => ss.id !== scheduleShowId));
                if (onShowDelete) onShowDelete(scheduleShowId);
            } else {
                console.error(`Failed to delete:`, response.statusText);
            }
        } catch (err) {
            console.error('Error deleting show:', err);
        }
    };

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
                   shows.map(scheduleShow => (
                    <button key={scheduleShow.id} onClick={() => handleDeleteShow(scheduleShow.id)}>
                        {scheduleShow.show.name} – {scheduleShow.show.time}
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
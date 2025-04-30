import './ScheduleShows.css';
import { useState, useEffect } from 'react';

function ScheduleShows({ selectedSchedule, onShowDelete, setSelectedSchedule }) {


    useEffect(() => {
        if (selectedSchedule && selectedSchedule.id) {
            async function fetchShows() {
                try {
                    const response = await fetch(`http://localhost:3000/api/v1/schedules/${selectedSchedule.id}/schedule_shows`);
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setSelectedSchedule(prevSchedule => ({
                            ...prevSchedule,
                            shows: data
                        }));
                    }
                } catch (error) {
                    console.error('Error fetching schedule shows:', error);
                }
            }
            
            fetchShows();
        }
    }, [selectedSchedule?.id]);


    const handleDeleteShow = async (scheduleShowId) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/schedules/${selectedSchedule.id}/schedule_shows/${scheduleShowId}`,
                { method: 'DELETE' }
            );

            if (response.ok) {
                if (onShowDelete) onShowDelete(scheduleShowId);
            } else {
                console.error(`Failed to delete:`, response.statusText);
            }
        } catch (err) {
            console.error('Error deleting show:', err);
        }
    };

    if (!selectedSchedule || !selectedSchedule.shows) {
        return <p>No schedule selected or schedule is missing shows.</p>;
    }

    return (
        <div>
            {console.log(selectedSchedule.shows)}
          <p>{selectedSchedule.name}'s shows!</p>
          <section className="show-list">
            {selectedSchedule.shows.length > 0 ? (
              selectedSchedule.shows.map(show => (
                <button key={show.id} onClick={() => handleDeleteShow(show.id)}>
                    {show?.show?.name} – {show?.show?.time}
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
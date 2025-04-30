import './ScheduleShows.css';
import { useState, useEffect } from 'react';

function ScheduleShows({ selectedSchedule, onShowDelete, setSelectedSchedule }) {
    const [isAscending, setIsAscending] = useState(true);

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

    const toggleSortOrder = () => {
        setIsAscending(prev => !prev);
    };

    if (!selectedSchedule || !selectedSchedule.shows) {
        return <p>No schedule selected or schedule is missing shows.</p>;
    }
    
    const sortedShows = [...selectedSchedule.shows].sort((a, b) => {
        const nameA = a.show?.name?.toLowerCase() || '';
        const nameB = b.show?.name?.toLowerCase() || '';
        return isAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    
    return (
        <div className = 'schedule-show-container'>
            <p>{selectedSchedule.name}'s shows!</p>
            <button onClick={toggleSortOrder}>
                Sort {isAscending ? 'Descending' : 'Ascending'}
            </button>

            <section className="show-list">
                {selectedSchedule.shows.length > 0 ? (
                    sortedShows.map((scheduleShow) => (
                        <div key={scheduleShow.id} className="show-card">
                            <h3>{scheduleShow.show?.name || 'Unnamed Show'}</h3>
                            <p>{scheduleShow.show?.time || 'No Time'}</p>

                            <h4>Attendees:</h4>
                            <ul>
                                {scheduleShow.show?.users?.length > 0 ? (
                                    [...new Set(scheduleShow.show.users.map(user => user.id))].map(userId => {
                                        const uniqueUser = scheduleShow.show.users.find(user => user.id === userId);
                                        return (
                                            <li key={uniqueUser.id}>{uniqueUser.name}</li>
                                        );
                                    })
                                ) : (
                                    <li>No attendees</li>
                                )}
                            </ul>

                            <button onClick={() => handleDeleteShow(scheduleShow.id)}>
                                Delete from Schedule
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No shows in the schedule!</p>
                )}
            </section>
        </div>
    );
}

export default ScheduleShows;
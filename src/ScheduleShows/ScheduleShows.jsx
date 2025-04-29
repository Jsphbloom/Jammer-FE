import './ScheduleShows.css';

function ScheduleShows({ schedules }) {
    if (!schedules || !schedules.shows) {
        return <p>No schedule selected or schedule is missing shows.</p>;
    }

    return (
        <div>
            <p>{schedules.name}'s shows!</p>
            <section className='show-list'>
                {schedules.shows.map((show) => (
                    <li key={show.id}>
                        {show.name} – {show.time}
                    </li>
                ))}
            </section>
        </div>
    );
}

export default ScheduleShows
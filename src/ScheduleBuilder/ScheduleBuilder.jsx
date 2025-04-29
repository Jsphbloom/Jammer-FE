import './ScheduleBuilder.css';

function ScheduleBuilder({ schedules }) {
    if (!schedules || !schedules.shows) {
        return <p>No schedule selected or schedule is missing shows.</p>;
    }

    return (
        <ul>
            {schedules.shows.map((show) => (
                <li key={show.id}>
                    {show.name} – {show.time}
                </li>
            ))}
        </ul>
    );
}

export default ScheduleBuilder
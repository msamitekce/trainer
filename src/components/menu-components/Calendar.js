import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import moment from "moment";

function Calendar() {

    const [events, setEvents] = useState([]);

    const fetchEvents = () => {
        fetch(`http://customerrest.herokuapp.com/gettrainings`)
            .then(response => response.json())
            .then(data => {
                const gottenEvents = data.map((anEvent) => {
                    return {
                        id: anEvent.id.toString(),
                        activity: anEvent.activity,
                        date: moment(anEvent.date).utc(),
                        duration: anEvent.duration,
                        customer: anEvent.customer.firstname + " " + anEvent.customer.lastname,
                    };
                });
                setEvents(gottenEvents);
            }).catch(error => console.error(error));
    };

    useEffect(() => { fetchEvents(); }, []);

    return (
        <div style={{ marginTop: "10vh" }}>
            <FullCalendar
                plugins={[timeGridPlugin, dayGridPlugin, listPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: "prev,today,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                events={events.map((event) => {
                    return {
                        title: event.activity + " " + event.customer,
                        start: moment(event.date).toDate(),
                        end: moment(event.date).add(moment.duration(event.duration, "minutes"))
                            .toDate(),
                    };
                })}
                timeZone="local"
                locale="eng"
                slotMinTime="00:00:00"
                slotMaxTime="24:00:00"
                height={"90vh"}
            />
        </div>
    );
};

export default Calendar;
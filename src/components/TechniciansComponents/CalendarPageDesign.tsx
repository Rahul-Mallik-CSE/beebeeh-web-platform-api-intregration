/** @format */
"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import { technicianCalendarEvents } from "@/data/TechniciansData";
import { CalendarJobEvent } from "@/types/TechniciansTypes";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

interface CalendarEvent extends Event {
  title: string;
  start: Date;
  end: Date;
  resource?: CalendarJobEvent;
}

const CalendarPageDesign = () => {
  // Transform technicianCalendarEvents to react-big-calendar format
  const transformedEvents = useMemo(() => {
    return technicianCalendarEvents.map((event) => ({
      title: `I: ${event.installations} | R: ${event.repairs} | M: ${event.maintenance}`,
      start: event.date,
      end: event.date,
      resource: event,
    }));
  }, []);

  const [events, setEvents] = useState<CalendarEvent[]>(transformedEvents);

  // Handle event drop (drag and drop)
  const onEventDrop: withDragAndDropProps["onEventDrop"] = useCallback(
    ({
      event,
      start,
      end,
    }: Parameters<NonNullable<withDragAndDropProps["onEventDrop"]>>[0]) => {
      setEvents((prevEvents) =>
        prevEvents.map((ev) =>
          ev === event
            ? {
                ...ev,
                start: start as Date,
                end: end as Date,
                resource: ev.resource
                  ? { ...ev.resource, date: start as Date }
                  : undefined,
              }
            : ev
        )
      );
    },
    []
  );

  // Custom event style
  const eventStyleGetter = (event: CalendarEvent) => {
    const resource = event.resource;
    if (!resource) return {};

    return {
      style: {
        backgroundColor: resource.bgColor,
        borderLeft: `4px solid ${resource.color}`,
        color: resource.textColor,
        borderRadius: "4px",
        border: "none",
        padding: "4px 8px",
        fontSize: "12px",
        fontWeight: "500",
      },
    };
  };

  // Custom event component
  const EventComponent = ({ event }: { event: CalendarEvent }) => {
    const resource = event.resource;
    if (!resource) return <span>{event.title}</span>;

    return (
      <div className="space-y-0.5">
        <div className="flex justify-between items-center">
          <span className="font-medium text-xs">Installations</span>
          <span className="font-semibold text-xs">
            {resource.installations}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-xs">Repairs</span>
          <span className="font-semibold text-xs">{resource.repairs}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-xs">Maintenance</span>
          <span className="font-semibold text-xs">{resource.maintenance}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
          Technician Calendar
        </h1>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <DnDCalendar
            localizer={localizer}
            events={events as any}
            onEventDrop={onEventDrop}
            defaultView="month"
            defaultDate={new Date(2025, 1, 1)}
            style={{ height: 700 }}
            eventPropGetter={eventStyleGetter as any}
            components={
              {
                event: EventComponent as any,
              } as any
            }
            draggableAccessor={() => true}
            resizable={false}
            popup
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPageDesign;

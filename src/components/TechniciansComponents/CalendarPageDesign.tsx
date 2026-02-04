/** @format */
"use client";

import React, { useMemo } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import { useGetTechnicianCalendarMonthQuery } from "@/redux/features/adminFeatures/technicianAPI";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface CalendarEvent extends Event {
  title: string;
  start: Date;
  end: Date;
  resource?: {
    installations: number;
    repairs: number;
    maintenance: number;
    bgColor: string;
    color: string;
    textColor: string;
  };
}

interface CalendarPageDesignProps {
  technicianId: string;
}

const CalendarPageDesign = ({ technicianId }: CalendarPageDesignProps) => {
  // Fetch calendar data from API
  const { data, isLoading, error } =
    useGetTechnicianCalendarMonthQuery(technicianId);

  // Transform API data to react-big-calendar format
  const events = useMemo(() => {
    if (!data?.data?.days) return [];

    return data.data.days.map((day) => {
      const totalJobs = day.installations + day.repairs + day.maintenance;

      // Color logic based on job counts
      let bgColor = "#FEF3F2";
      let color = "#D92D20";
      let textColor = "#D92D20";

      if (totalJobs === 0) {
        bgColor = "#F9FAFB";
        color = "#6B7280";
        textColor = "#6B7280";
      } else if (totalJobs <= 3) {
        bgColor = "#FEF3F2";
        color = "#D92D20";
        textColor = "#D92D20";
      } else if (totalJobs <= 6) {
        bgColor = "#FFFAEB";
        color = "#F79009";
        textColor = "#F79009";
      } else {
        bgColor = "#FEE2E2";
        color = "#DC2626";
        textColor = "#DC2626";
      }

      return {
        title: `I: ${day.installations} | R: ${day.repairs} | M: ${day.maintenance}`,
        start: new Date(day.date),
        end: new Date(day.date),
        resource: {
          installations: day.installations,
          repairs: day.repairs,
          maintenance: day.maintenance,
          bgColor,
          color,
          textColor,
        },
      };
    });
  }, [data]);

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

  if (isLoading) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-center h-[700px]">
              <div className="text-gray-500">Loading calendar...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-center h-[700px]">
              <div className="text-red-500">Failed to load calendar data</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <Calendar
            localizer={localizer}
            events={events as any}
            defaultView="month"
            defaultDate={new Date()}
            style={{ height: 700 }}
            eventPropGetter={eventStyleGetter as any}
            components={
              {
                event: EventComponent as any,
              } as any
            }
            popup
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPageDesign;

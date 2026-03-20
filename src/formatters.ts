import type { DateTimeObject, DirectionObject, LineObject, RouteObject, ScheduleObject, StopAreaObject, StopPointObject } from "./types";

function formatTimeString(time: string): Date { // "HHMMSS"
  const hours = parseInt(time.substring(0, 2), 10);
  const minutes = parseInt(time.substring(2, 4), 10);
  const seconds = parseInt(time.substring(4, 6), 10);
  const now = new Date();
  now.setHours(hours, minutes, seconds, 0);
  return now;
}

function formatDateTimeString(dateTime: string): Date { // "YYYYMMDDTHHMMSS"
  const year = parseInt(dateTime.substring(0, 4), 10);
  const month = parseInt(dateTime.substring(4, 6), 10) - 1;
  const day = parseInt(dateTime.substring(6, 8), 10);
  const hours = parseInt(dateTime.substring(9, 11), 10);
  const minutes = parseInt(dateTime.substring(11, 13), 10);
  const seconds = parseInt(dateTime.substring(13, 15), 10);
  return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
}

export function formatLine(line: any): LineObject {
  return {
    id: line.id,
    name: line.name,
    code: line.code,
    color: line.color,
    text_color: line.text_color,
    codes: line.codes,
    routes: line.routes.map(formatRoute),
    opening_time: formatTimeString(line.opening_time),
    closing_time: formatTimeString(line.closing_time),
  };
}

export function formatRoute(route: any): RouteObject {
  return {
    id: route.id,
    name: route.name,
    is_frequence: route.is_frequence === "True",
    direction_type: route.direction_type,
    codes: route.codes,
    direction: formatDirection(route.direction),
  };
}

export function formatDirection(direction: any): DirectionObject {
  return {
    id: direction.id,
    name: direction.name,
    quality: direction.quality,
    stop_area: formatStopArea(direction.stop_area),
  };
}

export function formatStopArea(stopArea: any): StopAreaObject {
  return {
    id: stopArea.id,
    name: stopArea.name,
    codes: stopArea.codes,
    timezone: stopArea.timezone,
    label: stopArea.label,
    coord: {
      lon: parseFloat(stopArea.coord.lon),
      lat: parseFloat(stopArea.coord.lat),
    },
  };
}

export function formatSchedule(schedule: any): ScheduleObject {
  return {
    stop_point: formatStopPoint(schedule.stop_point),
    route: formatRoute(schedule.route),
    display_informations: schedule.display_informations,
    date_times: schedule.date_times.map(formatDateTime),
    links: schedule.links,
    first_datetime: formatDateTime(schedule.first_datetime),
    last_datetime: formatDateTime(schedule.last_datetime),
  };
}

export function formatStopPoint(stopPoint: any): StopPointObject {
  return {
    id: stopPoint.id,
    name: stopPoint.name,
    codes: stopPoint.codes,
    label: stopPoint.label,
    coord: {
      lon: parseFloat(stopPoint.coord.lon),
      lat: parseFloat(stopPoint.coord.lat),
    },
    stop_area: formatStopArea(stopPoint.stop_area),
    equipments: stopPoint.equipments,
    address: stopPoint.address,
  };
}

export function formatDateTime(dateTime: any): DateTimeObject {
  return {
    date_time: formatDateTimeString(dateTime.date_time),
    base_date_time: formatDateTimeString(dateTime.base_date_time),
    data_freshness: dateTime.data_freshness,
  };
}
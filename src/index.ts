import { fetchData } from "./api";
import type { LineObject, ScheduleObject, StopAreaObject } from "./types";
import { formatLine, formatSchedule, formatStopArea } from "./formatters";

export type { LineObject, StopAreaObject, ScheduleObject } from "./types";

async function listLines(mode: "bus" | "tramway"): Promise<LineObject[]> {
  const res = await fetchData({
    pathname: "/v1/coverage/fr-ne-dijon/lines",
    query: {
      count: "300",
      disable_geojson: "true",
      filter: `physical_mode.id=physical_mode:${mode.substring(0, 1).toUpperCase() + mode.substring(1)}`,
    },
  });
  return res.lines.map(formatLine);
}

async function listStops(lineId: string): Promise<StopAreaObject[]> {
  const res = await fetchData({
    pathname: `/v1/coverage/fr-ne-dijon/lines/${lineId}/stop_areas`,
    query: {
      count: "100",
      depth: "3"
    },
  });
  return res.stop_areas.map(formatStopArea);
}

async function getSchedules(lineId: string, stopAreaId: string): Promise<ScheduleObject[]> {
  const datetime = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
  const formattedDatetime = datetime.toISOString().replace(/[^\dT]/g, "").slice(0, -3);
  const res = await fetchData({
    pathname: `/v1/coverage/fr-ne-dijon/lines/${lineId}/stop_areas/${stopAreaId}/terminus_schedules`,
    query: {
      count: "10",
      data_freshness: "realtime",
      disable_geojson: "true",
      from_datetime: formattedDatetime,
      items_per_schedule: "600"
    },
  });
  return res.terminus_schedules.map(formatSchedule);
}

export { listLines, listStops, getSchedules };

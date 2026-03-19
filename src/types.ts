export interface LineObject {
  id: string;
  name: string,
  code: string,
  color: string,
  text_color: string,
  codes: { type: string; value: string }[],
  routes: RouteObject[],
  opening_time: Date,
  closing_time: Date,
}

export interface RouteObject {
  id: string;
  name: string;
  is_frequence: boolean;
  direction_type: "forward" | "backward";
  codes: [{ type: string; value: string }];
  direction: DirectionObject;
}

export interface DirectionObject {
  id: string;
  name: string;
  quality: number;
  stop_area: StopAreaObject;
}

export interface StopAreaObject {
  id: string;
  name: string;
  codes: { type: string; value: string }[];
  timezone: string;
  label: string;
  coord: { lon: number; lat: number };
}

export interface ScheduleObject {
  stop_point: StopPointObject;
  route: RouteObject;
  display_informations: {
    commercial_mode: string;
    network: string;
    direction: string;
    label: string;
    color: string;
    code: string;
    headsign: string;
    name: string;
    links: unknown[];
    text_color: string;
    trip_short_name: string;
    company: string;
  };
  date_times: DateTimeObject[];
  links: { type: string; id: string }[];
  first_datetime: DateTimeObject;
  last_datetime: DateTimeObject;
}

export interface StopPointObject {
  id: string;
  name: string;
  codes: { type: string; value: string }[];
  label: string;
  coord: { lon: number; lat: number };
  stop_area: StopAreaObject;
  equipments: string[];
  address: string;
}

export interface DateTimeObject {
  date_time: Date;
  base_date_time: Date;
}
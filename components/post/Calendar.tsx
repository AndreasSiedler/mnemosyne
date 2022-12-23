import { map } from "lodash";
import moment from "moment";
import React from "react";

type Props = {};

export default function Calendar({}: Props) {
  const currentDate = moment();
  const weekStart = currentDate.clone().startOf("isoWeek");
  const weekEnd = currentDate.clone().endOf("isoWeek");
  var days = [];
  for (var i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, "days").format("MMMM Do,dddd"));
  }
  return (
    <div>
      {map(days, (day) => (
        <div>{day}</div>
      ))}
    </div>
  );
}

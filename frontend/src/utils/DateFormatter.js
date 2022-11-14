import React from "react";
import { Moment } from "react-moment";

const DateFormatter = ({ date }) => {
  return (
    <Moment format='D MMM YYYY' wirhTitle>
      {date}
    </Moment>
  );
};

export default DateFormatter;

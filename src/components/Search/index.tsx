import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfDay,
} from "date-fns";

import { capitalizeFirstLetter, formatDate } from "../../util";
import { dateArray, channelArray } from "./constants";

import SearchSvg from "../../images/search-faded.svg";
import DateFrom from "../../images/date-from.svg";
import DateTo from "../../images/date-to.svg";

import "react-datepicker/dist/react-datepicker-cssmodules.css";
import styles from "./index.scss";

interface SearchProps {
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = ({ setSearchOpen }: SearchProps) => {
  const history = useHistory();
  const [dateSelected, setDateSelected] = useState("");
  const [channelSelected, setChannelSelected] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const isLaterSelected = dateSelected === "LATER";

  const handleDateClick = (date: string) => {
    if (date === dateSelected) {
      setDateSelected("");
    } else {
      setDateSelected(date);
    }
  };

  const handleChannelClick = (channel: string) => {
    if (channel === channelSelected) {
      setChannelSelected("");
    } else {
      setChannelSelected(channel);
    }
  };

  const handleSubmit = () => {
    setSearchOpen(false);
    const url = generateQueryParams(
      isLaterSelected,
      dateSelected,
      channelSelected,
      startDate!,
      endDate!
    );
    if (url) {
      history.push(`/posts/${url}`);
    } else {
      history.push(`/posts`);
    }
  };

  return (
    <div className={styles.search}>
      <div className={styles.optionsContainer}>
        <div className={styles.optionContainer}>
          <p>DATE</p>
          <div className={styles.date}>
            {dateArray.map(date => (
              <p
                key={date}
                onClick={() => handleDateClick(date)}
                className={`${
                  date === dateSelected
                    ? isLaterSelected
                      ? styles.selectedDLater
                      : styles.selectedD
                    : styles.unselectedD
                } `}
              >
                {date}
              </p>
            ))}
          </div>
        </div>
        {isLaterSelected && (
          <div className={styles.laterOptions}>
            <img src={DateFrom} />
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              className={styles.datepicker}
              dateFormat="dd/MM/yyyy"
            />
            <div className={styles.dateSpacing} />
            <img src={DateTo} />
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              className={styles.datepicker}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        )}
        <div className={styles.optionContainer}>
          <p>CHANNEL</p>
          <div className={styles.channel}>
            {channelArray.map(channel => (
              <p
                key={channel}
                onClick={() => handleChannelClick(channel)}
                className={
                  channelSelected === channel
                    ? styles.selectedC
                    : styles.unselectedC
                }
              >
                {channel}
              </p>
            ))}
          </div>
        </div>
      </div>
      <button
        className={styles.searchButton}
        onClick={handleSubmit}
        style={{
          backgroundColor:
            isLaterSelected || dateSelected || channelSelected
              ? "#D5EF7F"
              : "#BABABA",
        }}
      >
        <div className={styles.buttonText}>
          <img src={SearchSvg} alt="search" />
          SEARCH
        </div>
        {(dateSelected || channelSelected) && (
          <p className={styles.searchText}>
            {getText(
              dateSelected,
              channelSelected,
              isLaterSelected,
              startDate,
              endDate
            )}
          </p>
        )}
      </button>
    </div>
  );
};

export default Search;

function getText(
  date: string,
  channel: string,
  isLaterSelected: boolean,
  startDate: Date | null,
  endDate: Date | null
) {
  let str = "activities";
  if (channel) str = `${channel} ${str}`;
  if (date) {
    if (isLaterSelected) {
      str = `${str} from ${formatDate(startDate!, "d/m")} - ${formatDate(
        endDate!,
        "d/m"
      )}`;
    } else {
      str = `${str} from ${date.toLowerCase()}`;
    }
  }
  return capitalizeFirstLetter(str);
}

function generateQueryParams(
  isLaterSelected: boolean,
  dateSelected: string,
  channelSelected: string,
  startDate: Date,
  endDate: Date
) {
  let url = "";
  if (isLaterSelected) {
    url = `?sDate=${startOfDay(startDate).toISOString()}&eDate=${startOfDay(
      endDate
    ).toISOString()}`;
  } else if (dateSelected) {
    if (dateSelected === "TODAY") {
      const tdy = startOfDay(new Date()).toISOString();
      url = `?sDate=${tdy}&eDate=${tdy}`;
    } else if (dateSelected === "TOMORROW") {
      const tmr = startOfDay(Date.now() + 3600 * 1000 * 24).toISOString();
      url = `?sDate=${tmr}&eDate=${tmr}`;
    } else if (dateSelected === "THIS WEEK") {
      const sDate = startOfDay(
        startOfWeek(new Date(), { weekStartsOn: 1 })
      ).toISOString();
      const eDate = startOfDay(
        endOfWeek(new Date(), { weekStartsOn: 1 })
      ).toISOString();
      url = `?sDate=${sDate}&eDate=${eDate}`;
    } else if (dateSelected === "THIS MONTH") {
      const sDate = startOfDay(startOfMonth(new Date()));
      const eDate = startOfDay(endOfMonth(new Date()));
      url = `?sDate=${sDate}&eDate=${eDate}`;
    }
  }

  if (channelSelected && channelSelected !== "All") {
    if (url) {
      url = `${url}&chn=${channelSelected}`;
    } else {
      // means url === ""
      url = `?chn=${channelSelected}`;
    }
  }
  return url;
}

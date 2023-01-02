import React, { useState } from "react";
import styled from "styled-components";
import moment, { Moment as MomentTypes } from "moment";

function DiaryCalendar() {
  const [date, setdate] = useState<moment.Moment>(() => moment());
  const handleDayClick = (current: moment.Moment) => setdate(current);
  const returnToday = () => setdate(moment());
  const jumpToMonth = (num: number) =>
    num
      ? setdate(date.clone().add(30, "day"))
      : setdate(date.clone().subtract(30, "day"));

  function generate() {
    const today = date;
    const startWeek = today.clone().startOf("month").week();
    const endWeek =
      today.clone().endOf("month").week() === 1
        ? 53
        : today.clone().endOf("month").week();

    let calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className="row" key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              // 오늘 => 주어진 주의 시작 => n + i일 만큼 더해서 각 주의 '일'을 표기한다.
              let current = today
                .clone()
                .week(week)
                .startOf("week")
                .add(n + i, "day");

              // 오늘이 current와 같다면 우선 '선택'으로 두자
              let isSelected =
                today.format("YYYYMMDD") === current.format("YYYYMMDD")
                  ? "selected"
                  : "";

              // 만약, 이번 달이 아닌 다른 달의 날짜라면 회색으로 표시하자
              let isGrayed =
                current.format("MM") !== today.format("MM") ? "grayed" : "";

              return (
                <div
                  className={`box ${isSelected} ${isGrayed}`}
                  key={i}
                  onClick={() => handleDayClick(current)}
                >
                  <span className="text">{current.format("D")}</span>
                </div>
              );
            })}
        </div>
      );
    }
    return calendar;
  }

  return (
    <Wrapper>
      <CalendarHead>
        <div className="head">
          <span className="title">{date.format("MMMM YYYY")}</span>
          <div className="util-button">
            <button onClick={() => jumpToMonth(0)}>
              <i className="fas fa-angle-left"></i>
            </button>
            <button onClick={returnToday}>Today</button>
            <button onClick={() => jumpToMonth(1)}>
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </div>
      </CalendarHead>
      <CalendarBody>
        <HeaderRowDiv className="row">
          {["일", "월", "화", "수", "목", "금", "토"].map((el) => (
            <HeaderColDiv className="box" key={el}>
              <span className="text">{el}</span>
            </HeaderColDiv>
          ))}
        </HeaderRowDiv>
        {generate()}
      </CalendarBody>
    </Wrapper>
  );
}
const HeaderColDiv = styled.div``;

const HeaderRowDiv = styled.div``;

const CalendarBody = styled.div``;
const Wrapper = styled.div``;
const CalendarHead = styled.div``;

export default DiaryCalendar;

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function CalendarWeekdays() {
  return (
    <div className="grid grid-cols-7">
      {WEEKDAYS.map((day) => (
        <p key={day} className="pretendard-m-15 text-center text-sub-gray-2">
          {day}
        </p>
      ))}
    </div>
  );
}

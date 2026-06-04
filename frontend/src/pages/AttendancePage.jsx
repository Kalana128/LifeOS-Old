import { useEffect, useState } from "react";

import {
  checkIn,
  checkOut,
  getAttendance,
} from "../services/attendanceService";

const AttendancePage = () => {
  const [attendance, setAttendance] =
    useState([]);

  const loadAttendance =
    async () => {
      try {
        const data =
          await getAttendance();

        setAttendance(
          data.attendance
        );
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadAttendance();
  }, []);

  const handleCheckIn =
    async () => {
      try {
        await checkIn(
          "DAY_6_TO_3"
        );

        await loadAttendance();
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Check In Failed"
        );
      }
    };

  const handleCheckOut =
    async () => {
      try {
        await checkOut();

        await loadAttendance();
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Check Out Failed"
        );
      }
    };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        Attendance
      </h1>

      <button
        onClick={handleCheckIn}
      >
        Check In
      </button>

      {" "}

      <button
        onClick={handleCheckOut}
      >
        Check Out
      </button>

      <hr />

      <h2>
        Attendance History
      </h2>

      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Shift</th>
            <th>Minutes</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map(
            (item) => (
              <tr
                key={item._id}
              >
                <td>
                  {item.date}
                </td>

                <td>
                  {item.shift}
                </td>

                <td>
                  {
                    item.totalMinutes
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;
import {
  Link,
} from "react-router-dom";

const DashboardPage = () => {
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        LifeOS Dashboard 🚀
      </h1>

      <br />

      <Link to="/attendance">
        Attendance
      </Link>
    </div>
  );
};

export default DashboardPage;
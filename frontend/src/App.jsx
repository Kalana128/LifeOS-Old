import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={
            <DashboardPage />
          }
        />
        <Route
          path="/attendance"
          element={
            <AttendancePage />
          }
        />


        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
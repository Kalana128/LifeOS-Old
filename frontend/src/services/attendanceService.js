import axios from "axios";

const API_URL =
  "http://localhost:5000/api/attendance";

const getToken = () =>
  localStorage.getItem("token");

export const checkIn = async (
  shift
) => {
  const response = await axios.post(
    `${API_URL}/check-in`,
    { shift },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export const checkOut = async () => {
  const response = await axios.post(
    `${API_URL}/check-out`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export const getAttendance =
  async () => {
    const response = await axios.get(
      API_URL,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.data;
  };
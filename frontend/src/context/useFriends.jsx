// src/hooks/useFriends.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosinstance } from "../lib/AxiosInstances";

export const useFriends = () => {
  const [allfriends, setAllFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        const response = await axiosinstance.get("/myfriends", {
          withCredentials: true,
        });
        setAllFriends(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          console.error("Error fetching friends:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [navigate]);

  return { allfriends, loading };
};



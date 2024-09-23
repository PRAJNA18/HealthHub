import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store user info

  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);
      if (!userInfo) {
        navigate("/"); // Navigate to the login page if no user info
      }
    } catch (error) {
      console.error("Failed to retrieve user info from localStorage", error);
      setUser(null); // Reset user to null in case of error
      navigate("/"); // Navigate to the login page
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook for using the context
export const useChat = () => useContext(ChatContext);

export default ChatProvider;

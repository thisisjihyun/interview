import { useNavigate } from "react-router-dom";

export const useGoToDirection = (direction) => {
  const navigate = useNavigate();
  return () => navigate(direction);
};

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Task from "./pages/task";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task" element={<Task />} />
    </Routes>
  );
};

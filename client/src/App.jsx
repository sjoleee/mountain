import { Routes, Route } from "react-router-dom";
import MapPage from "@pages/MapPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import FeedList from "@/pages/FeedPage";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/map" element={<MapPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user" />
      <Route path="/feeds" element={<FeedList />} />
    </Routes>
  );
}
export default App;

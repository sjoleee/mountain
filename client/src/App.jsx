import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MapPage from "@pages/MapPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import FeedList from "@/pages/FeedPage";
import AdminPage from "@/pages/AdminPage";
import { useState } from "react";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" />
        <Route path="/map" element={<MapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" />
        <Route path="/feeds" element={<FeedList />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </QueryClientProvider>
  );
}
export default App;

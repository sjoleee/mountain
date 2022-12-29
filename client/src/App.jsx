import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivateRoute from "@components/PrivateRoute";
import NavBar from "@components/common/NavBar";
import MainPage from "@pages/MainPage";
import MapPage from "@pages/MapPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ChallengePage from "@/pages/ChallengePage";
import ChallengeWritePage from "@/pages/ChallengeWrite";
import ChallengeBoardPage from "@/pages/ChallengeBoard";
import ChallengeUpdate from "@/pages/ChallengeUpdate";
import FeedList from "@/pages/FeedPage";
import AdminPage from "@/pages/AdminPage";
import RankingPage from "@pages/RankingPage";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/user" />
          <Route path="/feeds" element={<FeedList />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route path="/challenge">
            <Route index element={<ChallengePage />} />
            <Route path=":challengeId" element={<ChallengeBoardPage />} />
            <Route path=":challengeId/update" element={<ChallengeUpdate />} />
          </Route>
          <Route path="/challenge_write" element={<ChallengeWritePage />} />
          <Route path="/ranking" element={<RankingPage />} />
        </Route>
        <Route path="/" element={<MainPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </QueryClientProvider>
  );
}
export default App;

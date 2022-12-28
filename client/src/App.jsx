import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MapPage from "@pages/MapPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ChallengePage from "@/pages/ChallengePage";
import ChallengeWritePage from "@/pages/ChallengeWrite";
import ChallengeBoardPage from "@/pages/ChallengeBoard";
import ChallengeUpdate from "@/pages/ChallengeUpdate";
import FeedList from "@/pages/FeedPage";
import AdminPage from "@/pages/AdminPage";
import UserPage from "@pages/UserPage";
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
        <Route path="/user" element={<UserPage />} />
        <Route path="/feeds" element={<FeedList />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/challenge">
          <Route index element={<ChallengePage />} />
          <Route path=":challengeId" element={<ChallengeBoardPage />} />
          <Route path=":challengeId/update" element={<ChallengeUpdate />} />
        </Route>
        <Route path="/challenge_write" element={<ChallengeWritePage />} />
      </Routes>
    </QueryClientProvider>
  );
}
export default App;

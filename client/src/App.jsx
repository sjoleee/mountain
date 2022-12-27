import { Routes, Route } from "react-router-dom";
import MapPage from "@pages/MapPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ChallengePage from "@/pages/ChallengePage";
import ChallengeWritePage from "@/pages/ChallengeWrite";
import ChallengeBoardPage from "@/pages/ChallengeBoard";
import ChallengeUpdate from "@/pages/ChallengeUpdate";

function App() {
  return (
    <Routes>
      <Route path="/map" element={<MapPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/challenge">
        <Route index element={<ChallengePage />} />
        <Route path=":challengeId" element={<ChallengeBoardPage />} />
        <Route path=":challengeId/update" element={<ChallengeUpdate />} />
      </Route>
      <Route path="/challenge_write" element={<ChallengeWritePage />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { Dashboard } from "./pages/Dashboard";
import { NewClaim } from "./pages/NewClaim";
import { ClaimDetail } from "./pages/ClaimDetail";
import { BatchRun } from "./pages/BatchRun";
import { Evaluation } from "./pages/Evaluation";
import { Reference } from "./pages/Reference";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new-claim" element={<NewClaim />} />
        <Route path="/claims/:userId" element={<ClaimDetail />} />
        <Route path="/batch" element={<BatchRun />} />
        <Route path="/evaluation" element={<Evaluation />} />
        <Route path="/reference" element={<Reference />} />
      </Route>
    </Routes>
  );
}

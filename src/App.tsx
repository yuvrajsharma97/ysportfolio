import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage";

const AdminRoot = lazy(() => import("./admin/AdminRoot"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route
          path="/admin/*"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center bg-bg text-text-secondary">
                  Loading…
                </div>
              }
            >
              <AdminRoot />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

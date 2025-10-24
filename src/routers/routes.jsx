import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AdminPage } from "../pages/AdminPage";
import { RouteProtecter } from "../hooks/RouteProtecter";
import { LoginPage } from "../pages/LoginPage";

export function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RouteProtecter authenticate={false}>
              <HomePage />
            </RouteProtecter>
          }
        />
        <Route
          path="/login"
          element={
            <RouteProtecter authenticate={false}>
              <LoginPage />
            </RouteProtecter>
          }
        />
        <Route
          path="/admin"
          element={
            <RouteProtecter authenticate={true}>
              <AdminPage />
            </RouteProtecter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

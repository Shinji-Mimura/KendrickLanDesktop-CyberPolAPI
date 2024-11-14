import { BrowserRouter, Routes, Route } from "react-router-dom";

function Header() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index path="" element={<LoginPage />} />
          <Route path="login-otp" element={<OtpPage />} />
          <Route path="evidences" element={<EvidencesPage />} />
          <Route path="evidence-details" element={<EvidencePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Header;

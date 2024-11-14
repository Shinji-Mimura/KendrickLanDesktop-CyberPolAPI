import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage/LoginPage'
import MenuPage from './Pages/MenuPage/MenuPage'
import EvidencesPage from './Pages/EvidencesPage/EvidencesPage'
import ProfilePage from './Pages/ProfilePage/ProfilePage'
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index path="" element={<LoginPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="evidences" element={<EvidencesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import styles from './App.module.scss'
import MainPage from 'pages/MainPage';

function App() {
    return (
      <div>
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </HashRouter>
      </div>
    );
  }
  
export default App;
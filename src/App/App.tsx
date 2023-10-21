import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import styles from './App.module.scss'
import MainPage from 'pages/MainPage';
import DetaliedPage from 'pages/DetaliedPage';

function App() {
    return (
      <div className='app'>
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />

                <Route path="/subscription">
                  <Route path=":id" element={<DetaliedPage />} />
                </Route>
            </Routes>
        </HashRouter>
      </div>
    );
  }
  
export default App;
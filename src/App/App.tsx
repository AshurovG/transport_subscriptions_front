import { HashRouter, Routes, Route } from 'react-router-dom'
// import styles from './App.module.scss'
import MainPage from 'pages/MainPage';
import DetaliedPage from 'pages/DetaliedPage';
import RegistrationPage from 'pages/RegistrationPage';

function App() {
    return (
      <div className='app'>
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />

                <Route path="/subscription">
                  <Route path=":id" element={<DetaliedPage />} />
                </Route>

                <Route path='/registration' element={<RegistrationPage/>}></Route>
            </Routes>
        </HashRouter>
      </div>
    );
  }
  
export default App;
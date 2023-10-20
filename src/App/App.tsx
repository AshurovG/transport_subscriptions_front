import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import styles from './App.module.scss'

function App() {
    return (
      <div>
        <HashRouter>
            <Routes>
                {/* <Route path="/" element={<RecipesPage />} /> */}
            </Routes>
        </HashRouter>
      </div>
    );
  }
  
export default App;
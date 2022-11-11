import React from 'react';
import LandingPage from './components/LandingPage';
import 'tachyons';
import './App.css';
import Projects from './components/Projects';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';

// export default class App extends Component {
//   render() {
//     return (
//       <div className="font-opensans">
//         <LandingPage />
//       </div>
//     )
//   }
// }

 export default function App(){
  return(
       <Router>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="repository/:id" element={<Projects/>} />
            <Route path="*" element={<PageNotFound/>} />
          </Routes>
      </Router>
  )
}
import './App.css';
import RootPage from './pages/root'
import { Route, Routes} from 'react-router-dom';
import ProjectsPage from './pages/projects';
import ProfilePage from './pages/profile';
import Navbar from './components/ui/navbar';
import { Authenticator, View } from '@aws-amplify/ui-react';
function App() {

  return ( 
  <> 
  <Authenticator.Provider>
    <View>
    <Navbar/>
      <Routes>
        <Route path='/projects' element={<ProjectsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/' element={<RootPage/>}/>
      </Routes>
    </View>
  </Authenticator.Provider>
  </>
  )
}

export default App
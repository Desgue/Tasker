import RootPage from './pages/root'
import { Route, Routes} from 'react-router-dom';
import ProjectsPage from './pages/projects';
import ProfilePage from './pages/profile';
import TasksPage from './pages/tasks';
import Navbar from './components/tasker/navbar';
import { Authenticator, View } from '@aws-amplify/ui-react';
import LoginPage from './pages/login';
function App() {

  return ( 
  <> 
  <Authenticator.Provider>
    <View>
    <Navbar/>
      <Routes>
        <Route path='/projects/:projectId/tasks' element={<TasksPage/>}/>
        <Route path='/projects' element={<ProjectsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/login' element={<LoginPage/> }/>
        <Route path='/' element={<RootPage/>}/>
        <Route path='*' element={<div className='container text-center pt-36 '> 404 not found </div>}/>
      </Routes>
    </View>
  </Authenticator.Provider>
  </>
  )
}

export default App
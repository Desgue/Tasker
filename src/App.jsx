import { Route, Routes} from 'react-router-dom';
import RootPage from './pages/home/root'
import ProjectsPage from './pages/projects/ProjectsPage';
import ProfilePage from './pages/profile/profile';
import TasksPage from './pages/tasks/TasksPage';
import Navbar from './components/layout/navbar';
import LoginPage from './pages/login/login';
import { Authenticator, View } from '@aws-amplify/ui-react';
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
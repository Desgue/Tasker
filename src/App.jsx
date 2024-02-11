import "../app/globals.css"
import { Navigate, Route, Routes} from 'react-router-dom';
import RootPage from './pages/home/root'
import ProjectsPage from './pages/projects/ProjectsPage';
import ProfilePage from './pages/profile/ProfilePage';
import TasksPage from './pages/tasks/TasksPage';
import Navbar from './components/layout/navbar';
import LoginPage from './pages/login/login';
import { useAuthenticator } from '@aws-amplify/ui-react';
function App() {
  const { user } = useAuthenticator(context => [context.user]);
  return ( 
  <> 

    <Navbar isLogged= {user ? true : false}/>
      <Routes>
        <Route path='/projects/:projectId/tasks' element={<TasksPage/>}/>
        <Route path='/projects' element={ user ? <ProjectsPage/> : <Navigate to="/login"/>}/>
        <Route path='/profile' element={user  ? <ProfilePage/> : <Navigate to="/login"/>}/>
        <Route path='/login' element={<LoginPage/> }/>
        <Route path='/' element={<RootPage/>}/>
        <Route path='*' element={<div className='container text-center pt-36 '> 404 not found </div>}/>
      </Routes>

  </>
  )
}

export default App
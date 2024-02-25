import "../app/globals.css"
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import RootPage from './pages/home/root'
import ProjectsPage from './pages/projects/ProjectsPage';
import ProfilePage from './pages/profile/ProfilePage';
import TasksPage from './pages/tasks/TasksPage';
import Navbar from './components/layout/navbar';
import LoginPage from './pages/login/login';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { fetchAuthSession } from "aws-amplify/auth";
import awsExports from "./aws-exports"
import { Amplify } from "aws-amplify"
Amplify.configure(awsExports);


export const TokenContext = React.createContext(null)
function App() {
  const { user } = useAuthenticator(context => [context.user]);
  const [tokens, setTokens] = React.useState("")

  React.useEffect(() => {
      fetchAuthSession()
      .then((session) => {
        setTokens(session.tokens)
      })
      .catch((error) => {
        console.log(error);
      }
      )
  }, [])  
 
  if (user){
    if(tokens){
      return <AppPage tokens={tokens} user={user}/>
    }
  }else{
    return <AppPage user={user}/>
  }
}
export default App
function AppPage({tokens, user}) {

  if(user) return (
    <> 
    <TokenContext.Provider value={tokens}>
      <BrowserRouter>
      <Navbar isLogged= {user ? true : false}/>
        <Routes>
          <Route path='/projects' element={user ? <ProjectsPage/> : <Navigate to="/login"/>}/>
          <Route path= "projects/:projectId/tasks" element={user ? <TasksPage/> : <Navigate to="/login"/>}/>
          <Route path='/profile' element={ user ? <ProfilePage/> : <Navigate to="/login"/> }/>
          <Route path='/login' element={ !user ? <LoginPage/> : <Navigate to="/projects"/> }/>
          <Route path='/' element={<RootPage/>}/>
          <Route path='*' element={<Navigate to="/"/>}/>
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  </>
  );
}
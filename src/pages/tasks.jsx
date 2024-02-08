import React from 'react'
import Board from '@/components/tasker/board'
import BoardSider from '../components/tasker/boardSider'

const getTasks = async (projectId) => {
  const url = `http://localhost:8000/projects/${projectId}/tasks`
  const response = await fetch(url, {
    next: {
      revalidate: 60
    },
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      
    }, 
  } )
  const data = await response.json()
  
  return data
}

const TasksPage = () => {
  return (
    <main className='pt-36'>
        <div className='flex flex-row gap-8'>
        <BoardSider />
        <Board />
        </div>
    </main>
  )
}

export default TasksPage
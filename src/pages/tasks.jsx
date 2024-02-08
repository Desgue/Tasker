import React from 'react'
import Board from '@/components/tasker/board'
import BoardSider from '../components/tasker/boardSider'
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
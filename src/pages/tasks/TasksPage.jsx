import React from 'react'
import Board from "./board"
import BoardSider from './boardSider'

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
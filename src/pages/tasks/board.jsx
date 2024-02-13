import React from 'react'
import Task from './task'
 
const Board = ({tasks}) => {
  const pending = tasks ? tasks.filter(task => task.status === 'Pending') : null
  const inProgress = tasks ? tasks.filter(task => task.status === 'InProgress') : null
  const done = tasks ? tasks.filter(task => task.status === 'Done') : null

  const renderCard = (taskList) => taskList.map((task) => {
    return task && (
      <li className='p-2'> <Task task={task}/></li>
    )
  })

  return (
    <>
    <main className=' grid w-[95%] mx-8 grid-cols-3 flex-row gap-2 text-center rounded-xl'>
      <div className=" rounded-xl h-fit shadow-md  ">
        <h1 className='scroll-m-20 py-8 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          Pending
        </h1>
        <div className="flex flex-col pt-4">
          <ul className='mx-auto w-full' >
            {pending && renderCard(pending)}
          </ul>
          

        </div>
      </div>
      <div className="rounded-xl h-fit shadow-md ">
        <h1 className=' scroll-m-20 py-8 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          In Progress
        </h1>
        <div>
          <div className="flex flex-col pt-4 ">
            <ul className='mx-auto w-full'>
              {inProgress && renderCard(inProgress)}
            </ul>
          </div>
        </div>
      </div>
      <div className="rounded-xl h-fit shadow-md ">
        <h1 className='scroll-m-20  py-8 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          Done</h1>
        <div className="flex flex-col pt-4 ">
          <ul className='mx-auto w-full'>
            {done && renderCard(done)}
          </ul>
        </div>
      </div>
    </main>
    </>

  )
}

export default Board

import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Button } from '@/components/ui/button'
import NewTaskForm from "./createModal"

const BoardSider = () => {
    const [showAddForm, setShowAddForm] = useState(false)
    useEffect(() => {
        document.body.style.overflow = 'auto'
      }, [])
  return (
    <>
    {showAddForm && <NewTaskForm setShowAddForm = {setShowAddForm} />}
    <aside className="hidden py-8 left-0 sm:flex flex-col gap-8 w-56 text-center">
        <Button variant="ghost" className='text-lg hover:text-xl hover:font-semibold'>
          <Link to="/projects"> Projects</Link>
        </Button>
        <Button onClick={setShowAddForm} variant="ghost" className='text-lg hover:text-xl hover:font-semibold'>
          Add Tasks
        </Button>
      </aside>
    </>
  )
}

export default BoardSider
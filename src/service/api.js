
// Projects

export const getProjects = async(token) => {
	const url = `http://localhost:8000/projects`
	const response = await fetch(url, {
	  next: {
		revalidate: 60
	  },
	  method: 'GET',
	  headers: {
		'Content-Type': 'application/json',
		"Authorization": `Bearer ${token.access}`,
		"Authentication": `Bearer ${token.id}`,
		
	  }, 
	} )
	const data = await response.json()
	
	return data
  }

export const createProject = async (data, token) => {
    const url = `http://localhost:8000/projects`
	try{

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${token.access}`,
				"Authentication": `Bearer ${token.id}`,
			},
			body: JSON.stringify(data)
		})
		const result = await response.json()
		return result
	}
	catch{
		console.log('Error creating project')
		return null 
	}
  }

export const deleteProject = async (projectId, token) => {
    const url = `http://localhost:8000/projects/${projectId}`
	try{

		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${token.access}`,
				"Authentication": `Bearer ${token.id}`,
			},
		})
		if (response.ok ){
			console.log(`Project with id: ${id} has been deleted`)
        }
	}
	catch(e){
		console.log('Error deleting project')
		console.log(e)
				
	}
}

export const editProject = async (data, projectId, token) => {
	const url = `http://localhost:8000/projects/${projectId}`
	try{
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${token.access}`,
				"Authentication": `Bearer ${token.id}`,
			},
			body: JSON.stringify(data)
		})
		try{
			const result = await response.json()
			console.log(result)
			return result
		}
		catch{
			console.log('Error parsing response')
			return null
	  }
	}
	catch{
		console.log('Error editing project')
	}
}
  


  // Tasks

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


/* const createTask = async (data) => {
	const url = `http://localhost:8000/projects/${params.projectId}/tasks`
      const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        if (response.ok) {
            console.log('Task added successfully')
        }
}



const deleteTask = async () => {
	const url = `http://localhost:8000/projects/${params.projectId}/tasks/${task.id}`
	const response = await fetch(url, {
	  method: 'DELETE',
	  headers: {
		'Content-Type': 'application/json'
	  }
	})
	console.log(response)
	router.push(`/projects/${params.projectId}/tasks`)
	router.refresh()
	setShowDeletePopup(false)
  }

const updateTask = fetch(`http://localhost:8000/projects/${params.projectId}/tasks/${task.id}`, {
	method: 'PUT',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(data)
}).catch(err => console.log(err))
 */

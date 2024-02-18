
// Projects

const env = import.meta.env.VITE_REACT_APP_ENV

const apiURL = env === "PROD" ?  import.meta.env.VITE_REACT_APP_PROD_URL : import.meta.env.VITE_REACT_APP_DEV_URL

export const getProjects = async(tokens) => {
	const url = apiURL+'/projects'
	console.log(url)
	const response = await fetch(url, {
	  next: {
		revalidate: 60
	  },
	  method: 'GET',
	  headers: {
		'Content-Type': 'application/json',
		"Authorization": `Bearer ${tokens.accessToken}`,
		"Authentication": `Bearer ${tokens.idToken}`,
		
	  }, 
	} )
	const data = await response.json()
	
	return data
  }

export const createProject = async (data, tokens) => {
    const url = apiURL+"/projects"
	try{

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${tokens.accessToken}`,
				"Authentication": `Bearer ${tokens.idToken}`,
			},
			body: JSON.stringify(data)
		})
		const result = await response.json()
		console.log("Created project")
		return result
	}
	catch{
		console.log('Error creating project')
		return null 
	}
  }

export const deleteProject = async (projectId, tokens) => {
    const url = apiURL+'/projects/'+projectId
	try{

		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${tokens.accessToken}`,
				"Authentication": `Bearer ${tokens.idToken}`,
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

export const editProject = async (data, projectId, tokens) => {
	const url = apiURL+'/projects/'+projectId
	try{
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${tokens.accessToken}`,
				"Authentication": `Bearer ${tokens.idToken}`,
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

export const getTasks = async (projectId, tokens) => {
	const url = apiURL+'/projects/'+projectId+'/tasks'
	const response = await fetch(url, {
	  method: 'GET',
	  headers: {
		'Content-Type': 'application/json',
		"Authorization": `Bearer ${tokens.accessToken}`,
		"Authentication": `Bearer ${tokens.idToken}`,
		
	  }, 
	} )
	const data = await response.json()
	if (response.ok){
		console.log('Tasks fetched')
	}
	
	return data
  }


export const createTask = async (data, projectId, tokens) => {
	const url = apiURL+'/projects/'+projectId+'/tasks'
      const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
				"Authorization": `Bearer ${tokens.accessToken}`,
				"Authentication": `Bearer ${tokens.idToken}`,
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            console.log('Task added successfully')
        }
}



export const deleteTask = async (projectId, taskId, tokens) => {
	const url = apiURL+'/projects/'+projectId+'/tasks/'+taskId
	const response = await fetch(url, {
	  method: 'DELETE',
	  headers: {
		'Content-Type': 'application/json',
		"Authorization": `Bearer ${tokens.accessToken}`,
		"Authentication": `Bearer ${tokens.idToken}`,
	  }
	})
	if (response.ok){
		console.log('Task deleted')
		return response
	}
  }

export const editTask = async(data, projectId, taskId, tokens)=>{
	const url = apiURL+'/projects/'+projectId+'/tasks/'+taskId
	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${tokens.accessToken}`,
			"Authentication": `Bearer ${tokens.idToken}`,
		},
		body: JSON.stringify(data)
	})
	if (response.ok){
		console.log('Task updated')
	}
}


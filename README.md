# Project Name

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Technologies](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)


## Introduction

This project kicked off when I noticed a need for better planning and tracking of my side projects. The struggle was real – I'd start things, but finishing? Not so much. Regular project management tools were either team-centric or packed with features I didn't need. I wanted something more straightforward, less distracting. So, I decided to craft my own solution. It's been a journey,  and here's the kicker – it's not done yet. This tool is a work in progress, always evolving and teaching me new things. A mix of practicality and ongoing exploration.
## Features

**Implemented Features:**

1. **Authentication and Authorization:**
   - Secure user authentication and authorization process using Amazon Cognito user pools.

2. **Project List with Priority Status:**
   - Overview of projects with prioritized status for effective management.

3. **Task Tracking:**
   - Each project includes a task list with statuses: Pending, In Progress, or Done.



**Planned Features:**

1. **Kanban Board:**
   - Intuitive drag-and-drop Kanban board for visualizing tasks within each project.
   - The addition of a Kanban board enhances task visualization, making project management even more dynamic and user-friendly.

2. **Collaboration:**
   - Invite team members or friends to collaborate on projects together.

3. **Role Assignment:**
   - Assign specific roles for each project to streamline collaboration and responsibilities.




## System Architecture

![System Architecture Diagram](https://github.com/Desgue/tasker/blob/main/public/tasker-diagram2.drawio.svg)

1. User registration or login initiates the process, with information securely stored in the Amazon Cognito user pool.
2. Each user request includes an authentication token sent to the Golang API.
3. The Golang API validates the token with Amazon Cognito.
4. Upon successful validation, the server responds with the requested data.

## Technologies Used
**Frontend**
1. React with Vite
2. Shadcn UI components library
3. Tailwind CSS

**Backend**
1. Go API with Gorilla Mux for routing
2. PostgresSql DB

**Hosting**
1. Amazon Amplify hosts the frontend and Auth backend
2. Railway hosts the API and the managed Postgress Instance

## Getting Started





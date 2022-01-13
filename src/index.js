const express = require('express');
const {uuid} = require('uuidv4');

const app = express();


app.use(express.json())
// app.get('/projects', (request, response) => {
//     return response.send('{message: Hello World!}');
// });

const projects = [];

app.get('/projects', (request, response) => {

    return response.json(projects);
});

app.post('/projects', (request, response) => {
    const { title , owner } = request.body;

    const id = uuid();

    const project = {
        id,
        title,
        owner
    };

    projects.push(project)
    return response.json(project);
})

app.put('/projects/:id', (request, response) => {

    const { id } = request.params;
    const { title, owner } = request.body;  

    const projectIndex = projects.findIndex(project=>project.id===id)

    if(projectIndex < 0){
        return response.status(400).json({ error: 'Project not found.' });
    }

    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;
    console.log(id,title,owner);

    return response.json(project);
})

app.delete('/projects/:id', (request, response) => {
    return response.json([
        'Projeto 5',
        'Projeto 2',
        'Projeto 3'
    ]);
})

app.listen(3333, () => {
    console.log("Backend started!")
});
const express = require('express');
const {uuid} = require('uuidv4');

const app = express();


app.use(express.json())
// app.get('/projects', (request, response) => {
//     return response.send('{message: Hello World!}');
// });

const projects = [];

function logRoutes(request, response, next) {
    const { method, url } = request;
    const route = `[${method.toUpperCase()}] ${url}`;
    console.log(route);
    return next();
}

// para todas rotas
app.use(logRoutes);

//para rota especifica
// app.get('/projects', logRoutes, outroMiddleware (request, response) => {

// });

app.get('/projects', (request, response) => {
    const { title } = request.query;

    const results = title 
    ? projects.filter(project => project.title.includes(title))  
    : projects;

    return response.json(results);
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

    const projectIndex = projects.findIndex(project=>project.id===id);

    if(projectIndex < 0){
        return response.status(400).json({ error: 'Project not found.' });
    }

    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;
    console.log(id,1,title,1,owner);

    return response.json(project);
})

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project=>project.id===id);

    if(projectIndex < 0){
        return response.status(400).json({ error: 'Project not found.' });
    }

    excluido = projects.splice(projectIndex, 1);

    return response.status(204).json([]);
})

app.listen(3333, () => {
    console.log("Backend started!")
});
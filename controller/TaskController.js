const Task = require("../models/Task");

let message = "";
let type = "";

const getAllTask = async (req, res) => {
    try{
        const tasksList = await Task.find();
        return res.render("index", {
            tasksList, 
            task: null, 
            taskDelete: null,
            message,
            type
        });
    }
    catch(err){
        res.status(500).send({error: err.message});
    }
};

const createTask = async (req, res) => {
    const task = req.body;

    if(!task.task){
        message = "Insira a tarefa para adicionar a tarefa!";
        type = "danger";
        return res.redirect("/");
    }

    try{
        await Task.create(task);
        message = "Tarefa Adicionada com Sucesso!";
        type = "success";
        return res. redirect("/");
    }
    catch (err){
        res.status(500).send({error: err.message});
    }
};

const getById = async (req, res) => {
    try{
        const tasksList = await Task.find();
        if (req.params.method == "update"){
            const task = await Task.findOne({ _id: req.params.id });
            res.render("index", {task, taskDelete: null, tasksList, message, type});
        }
        else{
            const taskDelete = await Task.findOne({ _id: req.params.id });
            res.render("index", {task: null, taskDelete, tasksList, message, type});
        }
    } 
    catch(err){
        res.status(500).send({error: err.message});
    }
};

const updateOneTask = async (req, res) => {
    try{
        const task = req.body;
        await Task.updateOne({ _id: req.params.id}, task);
        message = "Tarefa Atualizada com Sucesso!";
        type = "success";
        res.redirect("/");
    }
    catch(err){
        res.status(500).send({ error: err.message});
    }
}

const deleteOneTask = async (req, res) => {
    const id = req.params.id;

    try{
        await Task.deleteOne({ _id: req.params.id});
        message = "Tarefa Deletada com Sucesso!";
        type = "success";
        res.redirect("/");
    }
    catch (err){
        res.status(500).send({ error: err.message});
    }
}

module.exports = {
    getAllTask,
    createTask,
    getById,
    updateOneTask,
    deleteOneTask,
};
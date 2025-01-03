const Todos = require("../models/todoModel");


const fetchTodos = async (req, res) => {
    try {

        let todos = await Todos.find();

        res.json({
            data: todos,
            status: "success"
        })

    } catch (error) {
        res.status(501).json({
            data: [],
            status: "error",
            error: error
        })

    }

}

const getTodoById = async (req, res) => {
    try {
        const id = req.params?.id;
        // let todo = await Todos.find({id:id});
        let todo = await Todos.findOne({ id: id });
        // let todo = await Todos.findById(id);
        res.json({
            data: todo,
            status: "success"
        })

    } catch (error) {
        res.status(501).json({
            data: [],
            status: "error",
            error: error
        })

    }
}

const createTodo = async (req, res) => {
    try {

        let newTodo = new Todos({
            id: req.body?.id,
            title: req.body?.title,
            description: req.body?.description,
            date: req.body?.date,
            location: req.body?.location
        })
        let output = await newTodo.save();
        res.json({
            data: output,
            status: "success"
        })

    } catch (error) {
        res.status(501).json({
            data: [],
            status: "error",
            error: error
        })
    }
}

const updateTodo = async (req, res) => {
    try {
        let id = req.params?.id;
        res.json({
            data: [],
            status: "success"
        })

    } catch (error) {
        res.status(501).json({
            data: [],
            status: "error",
            error: error
        })
    }
}


const deleteTodo = async (req, res) => {
    const { id } = req.params;  // 'id' is the MongoDB _id field

    try {
        const deletedTodo = await Todos.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ status: 'error', message: 'Todo not found' });
        }

        res.status(200).json({ status: 'success', data: deletedTodo });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};



module.exports = {
    fetchTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};
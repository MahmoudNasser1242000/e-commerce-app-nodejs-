import AppError from "../utils/errorClass.js";
import errorAsyncHandler from "./errorAsyncHandler.js";

const findById = (model, id, coll) => {
    return errorAsyncHandler(async (req, res, next) => {
        const doc = await model.findById(req.params[id]);
        if (!doc) 
            return next(new AppError(`Cant not find ${coll} with this id`, 400))
        res.status(200).json({[coll]: doc});
    })
}

const findOne = (model, id, coll) => {
    return errorAsyncHandler(async (req, res, next) => {
        const doc = await model.findOne({_id: req.params[id]});
        if (!doc) 
            return next(new AppError(`Cant not find ${coll} with this id`, 400))
        res.status(200).json({[coll]: doc});
    })
}

const findByIdAndDelete = (model, id, coll) => {
    return errorAsyncHandler(async (req, res, next) => {
        const doc = await model.findByIdAndDelete({_id: req.params[id]});
        if (!doc) 
            return next(new AppError(`Cant not find ${coll} with this id`, 400))
        res.status(202).json({msg: `${coll} deleted successfully`, [coll]: doc});
    })
}

export {
    findById,
    findOne,
    findByIdAndDelete
}
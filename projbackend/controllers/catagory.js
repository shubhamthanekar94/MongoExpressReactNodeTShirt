const Catagory = require("../models/catagory")

exports.getCatagoryById = (req, res, next, id) => {
    Catagory.findById(id).exec((err, cate) => {
        if(err){
            return res.status(400).json({
                error: "No Catagory was found in DB"
            })
        }
        req.catagory = cate
        next()
    })
}

exports.createCatagory = (req, res) => {
    const catagory = new Catagory(req.body)
    catagory.save((err, catagory) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save catagory in DB!!"
            })
        }
        res.json({catagory})
    })
}

exports.getCatagory = (req, res) => {
    return res.json(req.catagory)
}

exports.getAllCatagories = (req, res) => {
    Catagory.find().exec((err, catagories) => {
        if(err){
            return res.status(400).json({
                error: "No Catagory found!!"
            })
        }
        res.json(catagories)
    })
}

exports.updateCatagory = (req, res) => {
    const catagory = req.catagory
    catagory.name = req.body.name //resposiblefor grabbing catagory name sent from FE

    catagory.save((err, updatedCatagory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update catagory!!"
            })
        }
        res.json(updatedCatagory)
    })
}

exports.removeCatagory = (req, res) => {
    const catagory = req.catagory //req.catagory is coming from the middleware getCatagoryById
    catagory.remove((err, catagory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete this catagory!!"
            })
        }
        res.json({
            message: "Successfully Deleted!!"
        })
    }) 
}

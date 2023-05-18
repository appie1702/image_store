const asyncHandler = require('express-async-handler')
const Image = require('../models/imageModel');
const User = require('../models/userModel');


const uploadImage = asyncHandler(async(req,res)=>{

    const {title,url} = req.body;
    console.log(title,url)

    if(!req.session.user){
        throw new Error("Not logged in");
        return;
    }

    if(!url || !title){
        throw new Error("Please fill all the entries.")
    }

    const image = await Image.create({
        title,
        pic: url,
        user: req.session.user
    })

    if(image){
        res.status(201).json({
            image
        })
    }else{
        res.status(400);
        throw new Error("Failed to upload the image")
    }
})


const allimages = asyncHandler(async(req,res)=>{
    
    if(!req.session.user){
        throw new Error("Not logged in");
        return;
    }

    console.log(req.session.user)
    
    const allimages = await Image.find({user: req.session.user});

    console.log(allimages)

    if(!allimages){
        throw new Error("No images found");
        return;
    }

    res.status(200).json({
        allimages
    })
})


const updateCount = asyncHandler( async(req,res)=>{
    const {url} = req.body;

    const result = await Image.findOneAndUpdate({pic: url}, {$inc:{viewcount : 1}}, {
        new: true
      });

    if(!result){
        throw new Error("updatecount error")
        return;
    }

    res.status(200).json({result})
})

const searchImages = asyncHandler( async(req,res)=>{
    const {search} = req.body;
    console.log(search)

    const result = await Image.find({user: req.session.user, title : {$regex : search}});

    console.log(result)

    if(!result){
        return res.json({"message":"no images"})
    }

    return res.status(200).json({result})
})

module.exports = {uploadImage, allimages, updateCount, searchImages}
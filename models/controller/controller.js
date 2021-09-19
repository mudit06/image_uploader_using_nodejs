const fs = require('fs')
const uploadmodel= require('../model/schema')

exports.home= async(req,res)=>{
    const allimg = await uploadmodel.find()
    res.render('main',{images: allimg })
}

exports.uploads= (req,res,next)=>{
    const files = req.files

    if(!files){
        const error = new Error('Please select the images')
        error.httpStatusCode= 400
        return next(error)
    }
    //converting into base 64
    let imgArr = files.map((file)=>{
        let img= fs.readFileSync(file.path)
        console.log(img)

        return encode_img = img.toString('base64')
    })

    let result =imgArr.map((src,index)=>{
        //create object to store data to the collection
        let finalImg ={
            filename : files[index].originalname,
            contentType: files[index].mimetype,
            imageBase64: src 

        }

        let newUpload = new uploadmodel(finalImg)

        return newUpload
            .save()
            .then(()=>{
                return {msg: `${files[index].originalname} UPLOADED SUCESSFULLY`}
            })
            .catch(error =>{
                if(error){
                    if(error.name === 'MongoError' && error.code === 11000){
                        return Promise.reject({error: `Duplicate ${files[index].originalname} CANNOT UPLOAD` })
                    }
                    return Promise.reject({error: error.message || 'CANNOT UPLOAD'})
                }
            })
    })

    Promise.all(result)
        .then(msg =>{
            //res.json(msg)
            res.redirect('/')

        })
        .catch(err =>{
            res.json(err)
        })
}
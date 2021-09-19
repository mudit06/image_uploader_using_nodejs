const multer = require('multer')

//set storage
const storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename: function(req,f,cb){
        //image.jpg for extension
        var ext= f.originalname.substr(f.originalname.lastIndexOf('.'))

        cb(null,f.fieldname+'-'+Date.now()+ext)
    }
})

store= multer({storage:storage})

module.exports= store
import multer from "multer"


const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}-${file.originalname}`)
    }
})
const fileFilter=(req,file,callback)=>{
    if(file.mimetype=='image/jpg' || file.mimetype=='image/jpeg'|| file.mimetype=='image/png' || file.mimetype=='webp'){
        callback(null,true)
    }
    else{
        callback(null,false)
    }
}
const upload=multer({storage,fileFilter})
export default upload
const express = require('express');
const path = require('path');
const icontrollers = require('../controllers/index');
const router = express.Router();


//doc details
router.post('/userdocument',(req,res)=>{
    //console.log(req.files);
    if(!req.files){
        res.json({msg:'No file selected, Please select a file'});
    }
    else{
        const uploadedFile = req.files.document;
       // console.log(uploadedFile);
        //console.log(uploadedFile);
        const allowedExtensions = /pdf|doc|docx/;
        const extname = path.extname(uploadedFile.name);
        const fileSize = uploadedFile.size;
        const maxAllowedSize = 1024*1024*100;
        if(!allowedExtensions.test(extname)){
            res.json({
                msg: `You have uploaded a file with extension ${extname}, Please a upload either a pdf or a doc file`
            });
        }
        else if(fileSize>maxAllowedSize){
            res.json({
                msg: "The file uploaded is too large!! Please try again with a smaller file size"
            });
        }
        else{
            const uploadRemark = req.body.name;
            const docFile = {[uploadRemark]:uploadedFile};
            const loggedUserRemark ={
                userId: 1000
            // userEmail: req.body.emailId 
            };
            
            icontrollers.connectDb(req,res,docFile,loggedUserRemark);            
        }
        
    }
    
});


//getting the details of a particular fileHash
router.post('/userdochash',(req,res)=>{
    const fileHash = 'ba48df56abf360af7098d085058079ed';
    icontrollers.getDocRoute(req,res,fileHash);
});


//getting the details of a particular doc
router.post('/userdocdetails/:id',(req,res)=>{
    icontrollers.getDocDetails(req,res,req.params.id);
})


// getting all docs uploaded by the user
router.get('/alldocs',icontrollers.getAllDocs);

module.exports = router;

import  express  from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = []

router.get('/',(req,res)=>{
    console.log(users);
    res.send(users);
});

router.post('/',(req,res)=>{

    const user=req.body;

    users.push({...user, id: uuidv4()});

    console.log(req.body);
    res.send(`user with name ${user.firstname} added to the Data base!`);
});


router.get('/:id',(req,res)=> {


    const{ id } = req.params;


    const findUser = users.find((user)=> user.id=== id);
    res.send(findUser);
});

router.delete('/:id',(req,res)=> {


    const{ id } = req.params;


    users = users.filter((user)=> user.id !== id);
    res.send("users deleted");
});

router.patch('/:id',(req,res)=> {


    const{ id } = req.params;

    const{ firstname,lastname,age } = req.body;

    const findUser = users.find((user)=> user.id=== id);

    if(firstname){
        findUser.firstname=firstname;
    }
    if(lastname){
        findUser.lastname=lastname;
    }
    if(age){
        findUser.age=age;
    }
    
    res.send(findUser);
});

export default router;
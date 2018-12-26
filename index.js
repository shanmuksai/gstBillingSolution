// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
// Initialize the app
let app = express();
//for cors 
app.use(cors());
app.options('*', cors());
let today = new Date();
mongoURl='mongodb://slnop:shanmuks1@ds243254.mlab.com:43254/slnop';

app.use(bodyParser.json());


 sai =  async (collection) =>{
    try{
        let mongoClient = await MongoClient.connect(
            mongoURl,
            { useNewUrlParser: true });
    return mongoClient.db('slnop').collection(collection);
        
    }catch(e){
    console.log(e);
    }

 }
// Setup server port
var port = process.env.PORT || 8081;
app.use(express.static(__dirname+'/angular_app/billing-ui/'));
// Send message for default URL
app.get('/data', async (req, res) =>{ 
    let data = await sai('data');
     result = await data.find({}).toArray();
     console.log(today);
    res.send({data :result});
});

app.get('/', async (req, res) =>{ 
    let data = await sai('data');
     result = await data.find({}).toArray();
     console.log(__dirname);
     res.status(200).sendFile(__dirname+'/angular_app/billing-ui/index.html'); 
});

app.post('/save', async (req, res) =>{ 
    let data = await sai('data');
    req.body._id = await data.count()+1;
     result = await data.insertOne(req.body);
     res.status(200).send(req.body);
});

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});
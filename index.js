// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
// Initialize the app
let app = express();
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
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});
// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
// Initialize the app
let app = express();

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
// Send message for default URL
app.get('/', async (req, res) =>{ 
    let data = await sai('data');
    res.send({data :data.find({}).toArray()})
});

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});
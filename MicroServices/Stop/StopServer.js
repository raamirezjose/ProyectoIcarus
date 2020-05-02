import express from 'express';
import mongoose from 'mongoose';
import routemap from "./models/routemap";
import bodyParser from "body-parser";
import amqp from 'amqplib/callback_api';
const app = express();
const mongoDb =  "stopdb";
const mongoPath= "mongodb://localhost";

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

mongoose.connect(`mongodb://localhost/${mongoDb}`,{useNewUrlParser: true})
  .then(() => console.log(`conected to ${mongoDb}`))
  .catch(err => console.log(err));


app.set('port', process.env.PORT || 3500);

const server = app.listen(app.get('port'),()=>{
  console.log('south serve on port',app.get('port'));
}); 

app.post("/postroutemap", (req, res) => {
  mongoose
    .connect(`${mongoPath}/${mongoDb}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log(`conected to ${mongoDb}`))
    .catch((err) => console.log(err));

  var db = mongoose.connection;
  console.log(req.body);
  var route = new routemap({
    direction: 0,
    date: new Date()
  });
  db.once("open", () => {
    route.save((err, routes) => {
      if (err) return console.error(err);
      directionAMQT(JSON.stringify(route));
      res.json({ message: "Instrucción Stop Registrado Correctamente" });
    });
  });
});


const directionAMQT = (directionJson) =>{
  amqp.connect('amqp://localhost', function(error, connection) {
    if (error) {
      throw error;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      } 
      let queue = 'directions_queue';
      let direction = directionJson;  
      channel.assertQueue(queue, {
        durable: true
      });
      channel.sendToQueue(queue, Buffer.from(direction), {
        persistent: true
      });
      console.log("Sent '%s'", direction);
    });
    setTimeout(function() {
      connection.close();
    }, 500);
  });
}

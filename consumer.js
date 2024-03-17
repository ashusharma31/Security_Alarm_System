const amqp = require('amqplib');
const Cors = require("cors");
const ConnectionManagement = require('./connection-management');
const express = require('express');
const ValidateRole = require("./validate")
const http = require('http');
const app = express();
const Routes = require("./routes");



app.use(Cors({
    origin: 'http://localhost:3000', // Allow your frontend origin or use '*' for development
    methods: ["GET", "POST", "PUT", "DELETE"], // Optional: Specify allowed methods
}));

app.use("/api", Routes);
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",  // Allow requests from this origin
        methods: ["GET", "POST"],         // Allow these HTTP methods              // Allow cookies and HTTP authentication
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


let __databaseConnection;

const connectToMongoDB = async () => {
    let connectionManager = new ConnectionManagement();
    __databaseConnection = await connectionManager.connection();
};

const connectRabbitMQAndReceiveData = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'towerData';

        await channel.assertQueue(queue, {
            durable: false
        });

        console.log("Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                console.log("Received:", msg.content.toString());
                const data = JSON.parse(msg.content.toString());
                let isAnomalies = await checkIsAnomalies(data);
                data.isAnomalies = isAnomalies;
                data.createdDateTimeUtc = new Date();
                data.lastUpdatedDateTimeUtc = new Date();
                await __databaseConnection.collection("iotSensor_v1").insertOne(data);
                console.log("Data saved to MongoDB");
                if (data.isAnomalies) {
                    io.emit('sensorData', data);
                }
                channel.ack(msg);
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};

async function checkIsAnomalies(incomingObject) {
    try {
        let isAnomalies = false;
        if (incomingObject.temperature > 45) {
            return true;
        }
        else if (incomingObject.fuelStatus < 20) {
            return true;
        }
        else {

            let numberOfRecords = await __databaseConnection.collection("iotSensor_v1").aggregate([
                {
                    $match: {
                        powerSource: "Electric",
                        createdDateTimeUtc: {
                            $gte: new Date(new Date().getTime() - (2 * 60 * 60 * 1000)) // Adjust this according to your actual date field
                        }
                    }
                },
                {
                    $count: "numberOfRecords"
                }
            ]);
            numberOfRecords = await numberOfRecords.toArray();
            console.log(numberOfRecords);
            if (numberOfRecords[0].numberOfRecords === 0) {
                return true;
            }
            else {
                return false;
            }

        }
    }
    catch (err) {
        console.log(err);
    }

}

const main = async () => {
    await connectToMongoDB();
    await connectRabbitMQAndReceiveData();
};

main().catch(console.error);

const amqp = require('amqplib');

const predefinedLocations = [
    {
        location: { lat: 51.549106927443894, long: -0.18953240935386836 },
        towerId: "Tower 1"
    }
    ,
    {
        location: { lat: 51.65828410394748, long: 0.2540405886898865 },
        towerId: "Tower 2"
    },

    {
        location: { lat: 51.33682857664172, long: 0.012341369941586727 },
        towerId: "Tower 3"
    },

    {
        location: { lat: 51.25954793890168, long: -0.8473388058354709 },
        towerId: "Tower 4"
    },
    {
        location: { lat: 51.54674114613706, long: -1.0172950603519093 },
        towerId: "Tower 5"
    },

    {
        location: { lat: 51.624120748664666, long: -0.9356382405132111 },
        towerId: "Tower 6"
    },

    {
        location: { lat: 51.7901332038087, long: -1.0147133967831226 },
        towerId: "Tower 7"
    },

    {
        location: { lat: 51.61297554130046, long: -2.0334225366059857 },
        towerId: "Tower 8"
    },

    {
        location: { lat: 52.412455766960974, long: -0.03299339754943446 },
        towerId: "Tower 9"
    },

    {
        location: { lat: 52.664788081336894, long: -1.6383490193518337 },
        towerId: "Tower 10"
    },

    {
        location: { lat: 51.177975942499046, long: -0.4418480128399336 },
        towerId: "Tower 11"
    }
    // Add more predefined locations here
];

const connectRabbitMQAndSendData = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'towerData';

    await channel.assertQueue(queue, {
        durable: false
    });

    setInterval(async () => {
        let random = Math.floor(Math.random() * predefinedLocations.length);
        const data = {
            towerId: predefinedLocations[random].towerId,
            location: predefinedLocations[random].location,
            temperature: Math.floor(30 + Math.random() * (60 - 30)),
            powerSource: Math.random() > 0.5 ? 'DG' : 'Electric',
            fuelStatus: Math.floor(15 + Math.random() * (20)) // Random fuel status in liters
        };

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
        console.log("Sent: ", data);
    }, 5000); // Generate data every 5 seconds
};

connectRabbitMQAndSendData().catch(console.error);

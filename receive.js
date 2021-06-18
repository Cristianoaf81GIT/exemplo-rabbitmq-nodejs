const amqp = require('amqplib/callback_api');
amqp.connect('amqp://admin:admin@localhost', (error0,connection) => {
    if (error0)
        throw error0;

    connection.createChannel((error1, channel) => {
        if (error1)
            throw error1;
        var queue = 'hello';
        channel.assertQueue(queue, { durable: false });

        console.log(' [*] wating for messages in %s. to exit press CTRL+C', queue);
        channel.consume(queue, (msg) => {
            msg && 
            msg !== null 
            && console.log(' [*] Received %s ',msg.content.toString());
        },{ noAck: true});

    });
});
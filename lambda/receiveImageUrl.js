var AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

exports.handler = function(event, context) {
    var params = {
      MessageBody: JSON.stringify({
          url: event.queryStringParameters.url
      }),
      QueueUrl: "https://sqs.eu-west-2.amazonaws.com/616657489041/ImageDownloadQueue"
    };
    sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log('error:',"Fail Send Message" + err);
        context.done('error', "ERROR Put SQS");
      } else {
        console.log('data:',data.MessageId);
        context.done(null, '');
      }
    });
};

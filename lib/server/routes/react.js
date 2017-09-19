const path = require('path')
const bodyParser = require('body-parser')
const logger = require('../../../logger')
// api
const songs = require('./api/songs')
const Email = require('keystone-email')
const moment = require('moment')
const stitch = require("mongodb-stitch")

const client = new stitch.StitchClient('ce-frontend-mxyyw');
const db = client.service('mongodb', 'mongodb-atlas').db('cesperance');
client.authenticate('apiKey', process.env.STITCH_API_KEY).then(() => {
    console.log('Successfully authenticated as ' + client.authedId());
}).catch((err) => {
    console.error('Error authenticating: ' + err);
})
// Setup Route Bindings
const setRouter = (app) => {
    // Views
    logger.log('info', __dirname)
    app.get('/api/songs/id/:id', songs.get)
    app.get('/api/songs/:book', songs.list)
    app.post('/contact-us', (req, res) => {
        logger.info('Contact us')
        const name = req.body.name
        const email = req.body.email
        const subject = req.body.subject
        const message = req.body.message

        const coll = db.collection("forms")
        const time = moment().toDate()

        client.executeNamedPipeline("contact-us",
            {
                name,
                email,
                subject,
                message,
                created_at: time,
            }
        ).then(() => {
            return coll.insertOne({ name, email, subject, message, created_at: time, form_id: 'cecontact123' }, { w: "majority" })

        }).then((doc) => {
            res.send(doc)
        }).catch((err) => {
            res.status(404).send(err)
            logger.error(err)
        })
        /*new Email('./templates/email/email.pug', {transport: 'mailgun', engine: 'pug' }).
            send({comment}, {
                                apiKey: process.env.MAILGUN_API_KEY,
                domain: process.env.MAILGUN_DOMAIN,
                to: 'info@cesperance.com',
                from: `${name} <${email}>`,
                subject,
            }, function (err, result) {
                if (err) {
                                    logger.error('Could not send email:\n', err);
                                } else {
                                    logger.info('📬 Successfully sent Mailgun email result:\n', result);
                                res.send(result);
                }
            });
            */
    })
    // match the backend routes with the client routes
    app.use((req, res, next) => {
        if (req.path.match(/^\/keystone/)) {
            next();

            return;
        }

        res.render(path.join('index.ejs'));
    });

};

module.exports = setRouter
const admin = require("firebase-admin");
const serviceAccount = require("./persistence/ristoplatform-firebase-adminsdk-gst8v-ed84576acb.json");

class FirebaseEventDomainRepository {
    async sendNotificationEventDomain(event, deviceTokens) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://ristoplatform.firebaseio.com",
        });
        const message = {
            notification: event.toJson(),
            tokens: deviceTokens.map((deviceToken) => deviceToken.value),
        };
        admin
            .messaging()
            .sendMulticast(message)
            .then((response) => {
                console.log(response.successCount + " messages were sent successfully");
            });
    }
}

module.exports = FirebaseEventDomainRepository;

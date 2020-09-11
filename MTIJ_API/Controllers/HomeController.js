const Service = require("../services/HomeService");
const { HttpGet, HttpPost } = require("../Routes/HocConfigHttps");
const nodeMailer = require("nodemailer");
class HomeController {

    GetValue = HttpGet(async(params, model) => {
        return ["tai nguyen", "fdsfdsf"];
    });
    register = HttpPost(async(params, model) => {
        return model;
    });
    test = HttpGet(async(params, model) => {
        return model;
    });
    sendmail = HttpPost(async(params, model) => {
        let transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                // should be replaced with real sender's account
                user: "mapboxdialog1008@gmail.com",
                pass: "31102018admin",
            },
        });
        let mailOptions = {

            // should be replaced with real recipient's account
            to: model.mailaddress,
            subject: "req.body.subject",
            text: "http://localhost:5500/registration.html?id=" + model.encode,
        };
        console.log(mailOptions);

        return await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                    console.log(error);
                    return;
                }
                resolve(model);
                console.log("Message %s sent: %s", info);
            });
        });
    });
}

module.exports = new HomeController();
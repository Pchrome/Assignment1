const nodemailer = require("nodemailer");
import { Person } from '../People/Person.model';
import { Logger } from '../Logger/requestLogger';


/** Simple service to send a simple email to the added person with his phone number in a simple text. */
/** Uses gmail as the service with a dummy email address. */
/** The .env file is kept on the local PC not captured by git version control.  */

export interface EmailServiceInterface {
  sendEmail(person: Person): Promise<void>;
}
export class EmailService implements EmailServiceInterface {

    async sendEmail (person: Person): Promise<void> {
    
    try {
      const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "laplacecapstone4103@gmail.com",
          pass: process.env.GMAIL_APP_PASSWORD, /** Password is stored on a local .env file for security reasons. Others will have no access */
        },
      });
      const mailDetails = {
        from: "laplacecapstone4103@gmail.com",
        to: person.email,
        subject: "Creation Of New Person",
        text: `Person of Phone Number ${person.phoneNumber} has been created!`,
      };
      await mailTransporter.sendMail(mailDetails);
    } catch (err) {
      console.log(err)
      throw new Error('Failed to send email');
    }
  };
}
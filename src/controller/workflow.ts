// const nodemailer = require('nodemailer');
// import sgTransport from 'nodemailer-sendgrid';
// import i18n from 'i18n';
import db from '../dbConnection/db';

export default class Workflow  {
    public static async executeWorkfow (req: any) {
        let {workflowName, steps} = req.body;
        let invalidStepTypes: any = [];
        let idsArr: any = [];
        let duplicateIds: any = [];
        if (!workflowName) {
            return ("Required field missing workflowName");
        }
        if (!Array.isArray(steps)) {
            return ("Invalid data type Provided for steps array");
        }
        if (steps.length === 0) {
            return ("Required field missing steps");
        }
        steps.forEach((element: any) => {
            !["email", "webhook", "condition", "delay"].includes(element.type) ? invalidStepTypes.push(element.type) : idsArr.push(element.id);
        });

        if (invalidStepTypes.length > 0) {
            return (`Invalid type(s) provided ${invalidStepTypes}`);
        }
      
        steps.forEach((id: any) => {
            idsArr.includes(id) ? duplicateIds.push(id) : '';
        });
        if (duplicateIds.length > 0) {
            return (`Duplicate id(s) provided ${duplicateIds}`);
        }
        for(let step of steps) {
            switch (step.type) {
                case 'email':
                    await this.sendEmail(step.config);
                    break; 
                case 'condition':
                    await this.evaluateCondition(step.config);
                    break;
                case 'webhook':
                    await this.triggerWebhook(step.config);
                    break; 
            }
        }

        const query = 'INSERT INTO workflows (workflowName, steps) VALUES (?, ?)';
        db.query(query, [workflowName, steps], (err: any) => {
            if (err) return err;
            return ('Workflow created successfully');
        });
    }

    public static async sendEmail(options: {
        to: string, 
        subject: string, 
        text?: string, 
        html?: string
      }) {
        const transporter = nodemailer.createTransport(
          sgTransport({
            apiKey: 'uhjhbjk'
          })
        );

        const mailOptions = {
          from: process.env.EMAIL_SENDER,
          to: options.to,
          subject: options.subject,
          text: options.text,
          html: options.html
        };
      
        try {
          const result = await transporter.sendMail(mailOptions);
          console.log('Email sent successfully', result);
          return result;
        } catch (error) {
          console.error('Error sending email:', error);
          throw error;
        }
    }

    public static async evaluateCondition (req: any) {

    }

    public static async triggerWebhook (req: any) {

    }

    
}

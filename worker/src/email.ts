import nodemailer from "nodemailer";
// SOL_PRIVATE_KEY=""
// SMTP_USERNAME=""
// SMTP_PASSWORD=""
// SMTP_ENDPOINT

const transport = nodemailer.createTransport({
  service: 'gmail',
    auth: {
      user: 'Harshkhosla9945@gmail.com',
      pass: 'smos vryu mccy rhqp',
    },
  });

export async function sendEmail(to: string, body: string) {
    await transport.sendMail({
        from: "Harshkhosla9945@gmail.com",
        sender: "contact@100xdevs.com",
        to,
        subject: "Hello from Zapier",
        text: body
    })
}
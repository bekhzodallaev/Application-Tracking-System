import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export function sendResetEmail(email:string, resetLink:string) {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset your password',
    html: `
      <p>You requested a password reset.</p>
      <a href="${resetLink}">Reset password</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });
}

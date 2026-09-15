module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'localhost'),
        port: env.int('SMTP_PORT', 1025),
        secure: false,
        ignoreTLS: true,
      },
      settings: {
        defaultFrom: env('SMTP_FROM', 'no-reply@localhost'),
        defaultReplyTo: env('SMTP_FROM', 'no-reply@localhost'),
      },
    },
  },
});
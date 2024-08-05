export default {
  session: {
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  },
  environment: {
    dev: {
      SECRET_KEY:"MYSECRET",
      SMTP_SERVER: "",
      SMTP_PORT: 0,
      SMTP_EMAIL: "",
      SMTP_PASSWORD: "",
      SMTP_USERNAME: "",
      FRONTEND_URL:"http//"
    },
    prod: {},
  },
};

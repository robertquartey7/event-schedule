import { app } from "./src/main";

const PORT = 3000 || process.env.PORT;

app.listen(3000, () => {
  console.log(`running on port ${PORT}`);
});

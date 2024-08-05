import "reflect-metadata"
import { app } from "./src/main";

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`running on port ${PORT}`);
});

import "reflect-metadata"
import { app } from "./src/main";

const PORT = process.env.PORT || 8000;

app.listen(8000, () => {
  console.log(`running on port ${PORT}`);
});

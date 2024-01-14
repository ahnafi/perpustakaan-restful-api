import { app } from "./src/app/app.js";
import { logger } from "./src/app/logging.js";

app.listen(3000, () => {
  logger.info("app listen at port 3000");
});

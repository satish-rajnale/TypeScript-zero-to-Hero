import { createLogger } from "./factory-function";

const logger = createLogger();

 logger.info("info msg");
 logger.warn("warn msg");
 logger.debug("debug msg");
 logger.error("error msg");
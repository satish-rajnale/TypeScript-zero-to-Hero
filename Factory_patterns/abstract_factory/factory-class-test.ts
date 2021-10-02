import { LoggerFactory } from "./factory-class";

const logger = LoggerFactory.createLogger();

 logger.info("info msg");
 logger.warn("warn msg");
 logger.debug("debug msg");
 logger.error("error msg");
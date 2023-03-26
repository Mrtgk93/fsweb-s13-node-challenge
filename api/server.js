const express = require("express");
const server = express();
const projectsRouter = require("./projects/projects-router");
const actionRouter = require("./actions/actions-router");
const { logger } = require("./projects/projects-middleware");
server.use(express.json());
server.use("/api/projects", logger, projectsRouter);
server.use("/api/actions", logger, actionRouter);

module.exports = server;
// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import categoryRoutes from "./routers/categories.routes";
import usersRoutes from "./routers/users.routes";
import loginRoutes from "./routers/login.routes";
import realStateRoutes from "./routers/realState.routes";
import scheduleRoutes from "./routers/schedules.routes";

const app: Application = express();
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/realEstate", realStateRoutes);
app.use("/schedules", scheduleRoutes);

app.use(handleErrors);

export default app;

import express, {
	Application,
	NextFunction,
	Request,
	Response,
} from "npm:express";

interface IErrorObject extends Error {
	status?: number;
}

const app: Application = express();

const port = 4242;

app.get("/", (_req: Request, res: Response) => {
	res.send({
		success: true,
		message: "Hello Deno 2.0",
	});
});

// Error Handler for 404
app.use((req: Request, _res: Response, next: NextFunction) => {
	const error: IErrorObject = new Error(
		`Requested URL '${req.url}' Not Found!`
	);
	error.status = 404;
	next(error);
});

// Global Error Handler
app.use(
	(
		error: IErrorObject,
		_req: Request,
		res: Response,
		_next: NextFunction
	) => {
		console.error(error.message);
		res.status(error.status || 500).send({
			success: false,
			message: error.message || "Internal Server Error!",
		});
	}
);

await app.listen(port, () => {
	console.log(`Server is Running on Port: ${port}`);
});

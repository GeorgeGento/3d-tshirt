import express from 'express';
import cors from "cors";
import 'dotenv/config';
import Routes from './src/routes';

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.use(`/api/v1`, Routes);

app.get(`/`, (req, res, next) => {
    return res.status(200).json({
        message: "Welcome to DALL.E api!"
    })
})

app.listen(port, () => console.log(`Server running on port: ${port}`))
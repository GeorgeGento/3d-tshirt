import { NextFunction, Request, Response } from "express";
import Replicate from "replicate";
import axios from "axios";

const models = {
    general: {
        models: [
            'stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
            'prompthero/openjourney-v4:e8818682e72a8b25895c7d90e889b712b6edfc5151f145e3606f21c1e85c65bf',
            'stability-ai/sdxl:2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2'
        ],
        settings: {
            scheduler: "DPMSolverMultistep",
            guidance_scale: 12,
            num_inference_steps: 50
        }
    }
};

const negativePrompts = [
    "lowres", "bad anatomy", "bad hands", "text", "error", "missing fingers",
    "extra digit", "fewer digits", "cropped", "worst quality", "low quality",
    "normal quality", "jpeg artifacts", "signature", "watermark", "username",
    "blurry", "artist name"
].join(", ");

const replicateApi = new Replicate({
    auth: process.env.REPLICATE_KEY,
});

const generateImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ message: "Prompt is missing from body." });

        //@ts-ignore
        const response = await replicateApi.run(models.general.models[1], {
            input: {
                prompt, width: 512, height: 512,
                negative_prompt: negativePrompts, ...models.general.settings
            }
        });
        if (!response) return res.status(500).json({ message: "Something went wrong." });

        const imageRes = await axios.get(response[0], { responseType: "arraybuffer" });
        const contentType = imageRes.headers['content-type'];
        const base64String = `data:${contentType};base64,${Buffer.from(imageRes.data).toString('base64')}`;

        return res.status(201).json({
            photo: base64String
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Server error."
        })
    }
}

export { generateImage };
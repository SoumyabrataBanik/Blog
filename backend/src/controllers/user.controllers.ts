import e from "express";

export function testFunction(req: e.Request, res: e.Response) {
    return res.json({
        message: "API connection established successfully!",
    });
}

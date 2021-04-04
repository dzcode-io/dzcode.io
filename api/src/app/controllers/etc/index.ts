import { RequestHandler, Response } from "express";

interface Meta {
  name?: string;
  version?: string;
}

export const getRoot: RequestHandler = async (req, res: Response) => {
  const meta: Meta = { name: "@dzcode.io/api", version: "2.0.0" };
  res.send({
    ...meta,
    uptime: process.uptime(),
  });
};

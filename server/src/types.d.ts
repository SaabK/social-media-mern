import { Request } from "express";

interface BigRequest extends Request {
  userId?: string
}
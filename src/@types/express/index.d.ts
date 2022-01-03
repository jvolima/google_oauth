declare namespace Express {
  export interface Request {
    user?: {
      displayName: string;
    }
  }
}
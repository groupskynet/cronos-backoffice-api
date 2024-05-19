import { Server } from "./server";

export class Bootstrap {
  server?: Server;

  async start(): Promise<void> {
    const port = process.env.port ?? "3000";
    this.server = new Server(port);
    this.server.listen();
  }

  get httpServer(): Server["httpServer"] | undefined {
    return this.server?.getHTTPServer();
  }

  async stop(): Promise<void> {
    return this.server?.stop();
  }
}

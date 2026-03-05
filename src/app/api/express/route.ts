import { NextRequest } from "next/server";
import { expressApp } from "@/lib/express-app";

const runExpress = (req: Request) =>
  new Promise<Response>((resolve) => {
    const chunks: Uint8Array[] = [];
    const res = {
      statusCode: 200,
      headers: new Headers(),
      setHeader: (key: string, value: string) => res.headers.set(key, value),
      json: (body: unknown) => resolve(new Response(JSON.stringify(body), { status: res.statusCode, headers: res.headers })),
      end: (body = "") => resolve(new Response(body, { status: res.statusCode, headers: res.headers })),
      write: (chunk: Uint8Array) => chunks.push(chunk)
    } as any;

    expressApp(req as any, res);
  });

export async function GET(request: NextRequest) {
  return runExpress(new Request(new URL("/health", request.url), { method: "GET" }));
}

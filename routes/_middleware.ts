import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<unknown>,
) {
  const start = Date.now();
  const resp = await ctx.next();
  const url = req.url;
  if (
      //Ignore project specific files
      !url.includes("favicon.ico") 
      && !url.includes("diff_match_patch") 
      && !url.includes(".css")
      && !url.includes("_frsh") 
      && !url.includes(".txt")
      //Ignore spam 
      && !url.includes(".php") 
      && !url.includes("/wp-includes/")
  ) {
    const referrer = req.headers.get("referer") || 'no-referer';
    const region = Deno.env.get("DENO_REGION") || 'no-region';
    console.log(`${req.method} ${region} ${url} ${resp.status} ${Date.now() - start}ms ${referrer}`);
  }

  return resp;
}
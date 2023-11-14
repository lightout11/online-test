export async function POST(req: Request) {
  const url = process.env.BACKEND_URL + "/questions/new_question";
  const req_body = await req.json();

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req_body)
  });

  return res;
}

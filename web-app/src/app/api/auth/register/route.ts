export async function POST(req: Request) {
  const req_body = await req.json();
  
  const res = await fetch(process.env.BACKEND_URL + "/users/new_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req_body),
  });

  return res;
}

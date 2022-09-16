import { sendMessageRoute } from "./APIRoutes";

console.log(process.env.AUTH_TOKEN);

export async function query(data) {
  let response;
  try {
    response = await fetch(sendMessageRoute, {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
    const errorResponse = {
      error: "Something went wrong!",
    };

    return errorResponse;
  }
  const result = await response.json();
  return result;
}

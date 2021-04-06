export async function putQuestion(message) {
  const response = await fetch(
    `http://localhost:3001/api/questions/${message._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  );

  return response.json();
}

export async function getLiveQuestion() {
  const response = await fetch("http://localhost:3001/api/questions/live");

  if (response.status === 204) {
    return {};
  }

  return response.json();
}

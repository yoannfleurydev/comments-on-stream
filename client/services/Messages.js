export async function getMessages() {
  const response = await fetch("http://localhost:3001/api/messages");

  return response.json();
}

export async function deleteMessages() {
  return fetch("http://localhost:3001/api/messages", {
    method: "DELETE",
  });
}

export async function putMessage(message) {
  const response = await fetch(
    `http://localhost:3001/api/messages/${message._id}`,
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

export async function getQuestions() {
  const response = await fetch("http://localhost:3001/api/questions");

  return response.json();
}

import app from "./App";

export function run() {
  const port = 3001;

  app.listen(port, () => console.log(`Server is listening on ${port}`));
}

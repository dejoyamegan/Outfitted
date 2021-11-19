
import { userLogin } from "../authentication/login";

test("tooggleDone completes an incomplete todo", () => {

  const finState = userLogin();

  expect(finState).toEqual(null);
});
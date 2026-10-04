import { connectTestDB, closeTestDB, clearTestDB } from "./setup.js"
import { registerUser, loginUser } from "../services/userService.js"

beforeAll(async () => {
  await connectTestDB()
})

afterAll(async () => {
  await closeTestDB()
})

afterEach(async () => {
  await clearTestDB()
})

describe("loginUser", () => {
  test("throws 401 for wrong password", async () => {
    await registerUser("Ash", "ash@test.com", "correctpassword")

    await expect(
      loginUser("ash@test.com", "wrongpassword")
    ).rejects.toThrow("Invalid credentials")
  })

  test("succeeds and returns tokens for correct credentials", async () => {
    await registerUser("Ash", "ash@test.com", "correctpassword")

    const result = await loginUser("ash@test.com", "correctpassword")

    expect(result.user.email).toBe("ash@test.com")
    expect(result.accessToken).toBeDefined()    // defined nhi hai toh bas real aaye isliye toBeDefined so not undefined
    expect(result.refreshToken).toBeDefined()
  })
})
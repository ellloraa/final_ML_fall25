import SidechatAPIClient from "./src/classes/SidechatAPIClient.js";

const api = new SidechatAPIClient();

async function login() {
  const phoneNumber = "9179035960";
  const code = "A2QOQ6";

  const res = await api.verifySMSCode(phoneNumber, code);

  // Extract token manually
  const token = res.logged_in_user.token;

  console.log("TOKEN:", token);
}

login().catch(console.error);

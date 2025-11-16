import SidechatAPIClient from "./src/classes/SidechatAPIClient.js";

const api = new SidechatAPIClient("eyJhbGciOiJIUzI1NiJ9.YWQ5MWFkMzEtNTk0OS00NTVkLWJhYmQtZDJmYjI1Y2IyMDBl.-AANbJDBG03rh1c_RGCvb70CL__Qu0_oSH5r5PKeYTg");

async function main() {
  // Now you're authenticated forever (until token expires)
  const groups = await api.searchAvailableGroups("Davidson");
  const groupID = "1fcad7b1-fce2-4ae1-bd48-bd1917b62d98";
  const posts = await api.getGroupPosts(groupID, "recent");
  console.log(posts);
}

main();

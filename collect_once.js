import fs from "node:fs/promises";
import SidechatAPIClient from "./src/classes/SidechatAPIClient.js";

const TOKEN = "YOUR_TOKEN_HERE";
const api = new SidechatAPIClient("eyJhbGciOiJIUzI1NiJ9.YWQ5MWFkMzEtNTk0OS00NTVkLWJhYmQtZDJmYjI1Y2IyMDBl.-AANbJDBG03rh1c_RGCvb70CL__Qu0_oSH5r5PKeYTg");

async function main() {
  const { group } = await api.getUpdates(); // your primary group (Davidson)
  const groupID = group.id;

  const { posts } = await api.getGroupPosts(groupID, "hot");

  // Flatten / select useful fields
  const rows = posts.map(p => ({
    id: p.id,
    text: p.text,
    created_at: p.created_at,
    vote_total: p.vote_total,
    comment_count: p.comment_count,
    alias: p.alias,
    group_id: p.group_id,
    index_code: p.index_code,
  }));

  // Append to JSONL file
  const jsonl = rows.map(r => JSON.stringify(r)).join("\n") + "\n";
  await fs.appendFile("sidechat_posts.jsonl", jsonl);

  console.log(`Wrote ${rows.length} posts`);
}

main().catch(console.error);

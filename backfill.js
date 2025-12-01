// backfill.js
import fs from "node:fs/promises";
import SidechatAPIClient from "./src/classes/SidechatAPIClient.js";

const TOKEN = "YOUR_TOKEN_HERE";
const api = new SidechatAPIClient(TOKEN);

const POSTS_FILE = "posts.jsonl";

function toPostRow(p) {
  return {
    id: p.id,
    text: p.text,
    created_at: p.created_at,
    vote_total: p.vote_total,
    comment_count: p.comment_count,
    alias: p.alias,
    group_id: p.group_id,
    index_code: p.index_code,
  };
}

async function backfillAll(groupID, category = "hot") {
  let cursor = undefined;
  let page = 0;
  let total = 0;

  while (true) {
    page++;
    console.log(`Fetching page ${page} (cursor=${cursor ?? "none"})`);

    const res = await api.getGroupPosts(groupID, category, cursor);
    const posts = res.posts || res;      // depends on how it comes back
    cursor = res.cursor || res?.next;    // adjust to actual field name

    if (!posts || posts.length === 0) {
      console.log("No more posts, stopping.");
      break;
    }

    const rows = posts.map(toPostRow);
    const jsonl = rows.map(r => JSON.stringify(r)).join("\n") + "\n";
    await fs.appendFile(POSTS_FILE, jsonl);

    total += rows.length;
    console.log(`Wrote ${rows.length} posts (total=${total})`);

    if (!cursor) {
      console.log("No cursor returned, reached the end.");
      break;
    }

    // be nice to the API
    await new Promise(r => setTimeout(r, 500));
  }
}

async function main() {
  const { group } = await api.getUpdates();   // your primary group (Davidson)
  await backfillAll(group.id, "hot");         // or "recent"/"top"
}

main().catch(console.error);

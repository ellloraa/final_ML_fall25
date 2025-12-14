// backfill.js
import fs from "node:fs/promises";
import SidechatAPIClient from "./src/classes/SidechatAPIClient.js";

import "dotenv/config";

const TOKEN = process.env.SIDECHAT_TOKEN;
if (!TOKEN) throw new Error("Missing SIDECHAT_TOKEN");

const api = new SidechatAPIClient(TOKEN);

const POSTS_FILE = "more_yikyak_posts.jsonl";

const CUTOFF_DATE = new Date("2024-12-14T01:52:38.392Z");

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

async function backfillAll(groupID, category = "recent") {
  let cursor = undefined;
  let page = 0;
  let total = 0;

  while (true) { 
      page++; 
      console.log(`Fetching page ${page}`);
      const res = await api.getGroupPosts(groupID, category, cursor); 
      const posts = res.posts || res; cursor = res.cursor || res?.next; 
      if (!posts || posts.length === 0) { 
          console.log("No more posts, stopping."); 
          break; 
      } 
      // filter posts until cutoff 
      const rows = []; 
      for (const p of posts) { 
          const created = new Date(p.created_at); 
          if (created < CUTOFF_DATE) { 
              return; 
              // exit the whole backfill 
          } 
          rows.push(toPostRow(p)); 
      } 
      
      if (rows.length > 0) { 
          const jsonl = rows.map(r => JSON.stringify(r)).join("\n") + "\n"; 
          await fs.appendFile(POSTS_FILE, jsonl); 
          total += rows.length; 
      } 
      if (!cursor) { 
          console.log("No cursor returned, reached the end."); 
          break; 
      } 
      await new Promise(r => setTimeout(r, 500)); 
  } 
}

async function main() {
  const { group } = await api.getUpdates();
  await backfillAll(group.id, "recent");
}

main().catch(console.error);

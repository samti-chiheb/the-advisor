import React, { useState } from "react";
import { Client } from "@notionhq/client";

function NotionAdvice(props) {
  const [advice, setAdvice] = useState(props.advice);

  async function handleSave() {
    // Initialize the Notion client
    const notion = new Client({ auth: process.env.REACT_APP_NOTION_API_KEY });

    // Create a new block representing the advice
    const block = {
      object: "block",
      type: "paragraph",
      paragraph: {
        text: [
          {
            type: "text",
            text: {
              content: advice,
            },
          },
        ],
      },
    };

    // Update the user's Notion page with the new block
    try {
      const response = await notion.pages.update({
        page_id: props.pageId,
        properties: {
          Advice: {
            title: [
              {
                type: "text",
                text: {
                  content: advice,
                },
              },
            ],
          },
        },
        children: [block],
      });
      console.log(`Advice added to Notion page ${response.url}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={handleSave}>Save to Notion</button>
    </div>
  );
}

export default NotionAdvice;
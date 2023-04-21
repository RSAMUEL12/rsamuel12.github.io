import { Client } from "@notionhq/client";

const notion = new Client({ auth: import.meta.env.NOTION_KEY });
const databaseId = import.meta.env.NOTION_DATABASE_ID;

interface GetBlogPostResponse {
  results: [
    {
      id: string;
      cover: { file: { url: string } };
      properties: {
        Name: {
          title: [
            {
              plain_text: string;
            }
          ];
        };
        Description: {
          rich_text: [
            {
              plain_text: string;
            }
          ];
        };
        Publish: {
          checkbox: boolean;
        };
      };
    }
  ];
}

export const getBlogPosts = async (): Promise<GetBlogPostResponse> =>
  // @ts-ignore
  await notion.databases.query({
    database_id: databaseId ?? "",
  });

export const getBlogContent = async (id: string) =>
  await notion.blocks.children.list({
    block_id: "f41e48cd67074fc397fb6dd39cd711d7",
  });

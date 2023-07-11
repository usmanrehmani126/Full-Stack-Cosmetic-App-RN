import { createClient } from "@sanity/client";
import { fetchQuery } from "./utils/support";
const client = createClient({
  projectId: "hj1twip4",
  dataset: "production",
  apiVersion: "2023-07-07",
  useCdn: true,
});
export const fetchFeeds = async () => {
  let items = await client
    .fetch(
      `*[_type == 'products'] | order(_createdAt desc){
    _id,
    title,
    productType,
    mainImage {
      asset -> {
        url
      }
    },
    bgImage {
      asset -> {
        url
      }
    },
    shortDescription,
    description,
    price,
    categories[] -> {
      _id,
      title,
      mainImage {
      asset -> {
        url
      }
    },
    }
}`
    )
    .then((data) => {
      return data;
    });
    return items;
};

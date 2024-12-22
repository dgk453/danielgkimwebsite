import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import ContentBody from "@/components/ContentBody";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const { uid } = params;
  const client = createClient();

  const page = await client.getByUID("blog_post", uid).catch(() => {
    notFound();
    return null;
  });

  if (!page) return null; // Halt rendering if page is not found

  return <ContentBody page={page} />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { uid } = params;
  const client = createClient();

  const page = await client.getByUID("blog_post", uid).catch(() => {
    notFound();
    return null;
  });

  if (!page) return { title: "Not Found", description: "Page not found" };

  return {
    title: page.data.meta_title || "Untitled",
    description: page.data.meta_description || "No description available",
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}

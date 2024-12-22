// import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import { SliceZone } from "@prismicio/react";
// import Heading from "@/components/Heading";
// import { createClient } from "@/prismicio";
// import { components } from "@/slices";
// import Bounded from "@/components/Bounded";
// import { DateField, isFilled } from "@prismicio/client";

// type Params = { uid: string };

// export default async function Page({ params }: { params: Promise<Params> }) {
//   const { uid } = await params;
//   const client = createClient();
//   const page = await client.getByUID("blog_post", uid).catch(() => notFound());

//   function formatDate(date: DateField) {
//     if (isFilled.date(date)) {
//       const dateOptions: Intl.DateTimeFormatOptions = {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       };
//       return new Intl.DateTimeFormat("en-US", dateOptions).format(
//         new Date(date)
//       );
//     }
//   }

//   const formattedDate = formatDate(page.data.date);

//   return (
//     <Bounded as="article">
//       <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
//         <Heading as="h1">{page.data.title}</Heading>
//         <div className="flex gap-4 text-yellow-400">
//           {page.tags.map((tag) => (
//             <span key={tag}>{tag}</span>
//           ))}
//         </div>
//         <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
//           {formattedDate}
//         </p>
//         <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
//           <SliceZone slices={page.data.slices} components={components} />;
//         </div>
//       </div>
//     </Bounded>
//   );
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<Params>;
// }): Promise<Metadata> {
//   const { uid } = await params;
//   const client = createClient();
//   const page = await client.getByUID("blog_post", uid).catch(() => notFound());

//   return {
//     title: page.data.meta_title,
//     description: page.data.meta_description,
//   };
// }

// export async function generateStaticParams() {
//   const client = createClient();
//   const pages = await client.getAllByType("blog_post");

//   return pages.map((page) => {
//     return { uid: page.uid };
//   });
// }
import { SliceZone } from "@prismicio/react";
import Heading from "@/components/Heading";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import { Content, DateField, isFilled } from "@prismicio/client";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  function formatDate(date: DateField) {
    if (isFilled.date(date)) {
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", dateOptions).format(
        new Date(date)
      );
    }
    return null; // Fallback for invalid dates
  }

  const formattedDate = formatDate(page.data.date) || "Unknown Date";

  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{page.data.title || "Untitled"}</Heading>
        <div className="flex gap-4 text-yellow-400">
          {page.tags?.map((tag) => <span key={tag}>{tag}</span>) || (
            <span>No tags available</span>
          )}
        </div>
        <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
          {formattedDate}
        </p>
        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
          {page.data.slices ? (
            <SliceZone slices={page.data.slices} components={components} />
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
    </Bounded>
  );
}

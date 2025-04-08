import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/');
}





// // src/app/blog/[slug]/page.tsx
// /* eslint-disable @typescript-eslint/ban-ts-comment */
// // @ts-nocheck
// /* eslint-enable @typescript-eslint/ban-ts-comment */
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import { remark } from 'remark';
// import remarkParse from 'remark-parse';
// import remarkRehype from 'remark-rehype';
// import rehypeRaw from 'rehype-raw';
// import rehypeStringify from 'rehype-stringify';
// import Image from 'next/image';
// import { notFound } from 'next/navigation';
// import Navbar from "@/components/Navbar";

// export const dynamic = 'error';

// export async function generateStaticParams() {
//   const files = fs.readdirSync(path.join(process.cwd(), 'src/content/posts'));
//   return files.map((file) => ({ slug: file.replace(/\.md$/, '') }));
// }

// export default async function Page(props) {
//   // Extract slug from props.params
//   const slug = props?.params?.slug;

//   if (!slug) {
//     notFound();
//   }

//   const filePath = path.join(process.cwd(), 'src/content/posts', `${slug}.md`);
//   if (!fs.existsSync(filePath)) {
//     notFound();
//   }

//   const fileContents = fs.readFileSync(filePath, 'utf8');
//   const { data, content } = matter(fileContents);

//   const processedContent = await remark()
//     .use(remarkParse)
//     .use(remarkRehype, { allowDangerousHtml: true })
//     .use(rehypeRaw)
//     .use(rehypeStringify)
//     .process(content);

//   const contentHtml = processedContent.toString();

//   const publicImagePath = path.join(process.cwd(), 'public', data.image || '');
//   const imageExists = data.image && fs.existsSync(publicImagePath);
//   const postImage = imageExists ? data.image : "/thumbnails/default.png";

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-3xl mx-auto px-4 py-20">
//         <Image
//           src={postImage}
//           alt={data.title}
//           width={1200}
//           height={500}
//           className="w-full h-60 object-cover rounded-lg mb-6 border border-zinc-800"
//         />
//         <h1 className="text-4xl font-bold text-orange-500 mb-2">{data.title}</h1>

//         <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
//           <span>By {data.author || "Unknown Author"}</span>
//           <span>•</span>
//           <span>{data.date}</span>
//         </div>

//         {data.tags && Array.isArray(data.tags) && (
//           <div className="flex flex-wrap gap-2 mb-6">
//             {data.tags.map((tag) => (
//               <span
//                 key={tag}
//                 className="text-xs bg-zinc-800 border border-zinc-700 text-orange-400 px-2 py-1 rounded-full"
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         )}

//         <div
//           className="prose max-w-none prose-zinc dark:prose-invert"
//           dangerouslySetInnerHTML={{ __html: contentHtml }}
//         />
//       </div>
//     </div>
//   );
// }
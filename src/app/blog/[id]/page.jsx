import Header from "@/app/parts/Header";
import BlogContent from "./BlogDetail";
import Footer from "@/app/parts/Footer";

function extractId(slug) {
  return slug.split("-").pop();
}

async function fetchPost(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/blogs/${id}`, {
    headers: { "x-code": "RedNote" },
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata(props) {
  const id = extractId(props.params.id);
  const post = await fetchPost(id);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "This article does not exist.",
    };
  }

  const defaultImage = "https://articles.hirearrive.in/default-cover.jpg";
  const imageUrl = post.coverImage || defaultImage;
  const cleanDescription =
    post.description?.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 150) + "...";

  return {
    title: post.title,
    description: cleanDescription,
    openGraph: {
      title: post.title,
      description: cleanDescription,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_SERVER}/blog/${props.params.id}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 400,
          alt: post.title,
        },
      ],
      updated_time: new Date().toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      site: "@HireArrive",
      title: post.title,
      description: cleanDescription,
      images: [imageUrl],
    },
  };
}

export default async function BlogPost(props) {
  const id = extractId(props.params.id);
  const post = await fetchPost(id);

  return (
    <>
      <Header />
      {!post ? <div className="text-center mt-10 text-xl">Post not found.</div> : <BlogContent post={post} />}
      <Footer />
    </>
  )
}

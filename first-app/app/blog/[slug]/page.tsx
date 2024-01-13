interface Params {
  slug: string;
}

export default function BlogPostPage({ params }: { params: Params }) {
  return (
    <main>
      <h1>Blog Post Page</h1>
      <p>{params.slug}</p>
    </main>
  );
}

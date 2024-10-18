import Footer from "@/components/Footer";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import SocialShare from "@/components/SocialShare";
import PageNotFound from "@/components/PageNotFound";
import ReportBtn from "@/components/ReportBtn";

export async function generateMetadata({ params }) {
  // Fetch article data using the slug for metadata generation
  let article;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/article`,
      {
        params: { slug: params.slug },
      }
    );
    article = response.data.article;
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  if (!article) {
    return {
      title: "Post not found",
      description: "The article you are looking for does not exist.",
    };
  }

  // Construct metadata for the found article
  const metaTitle = article.title || "Patnaites News";
  const metaDescription =
    article.description.replace(/(<([^>]+)>)/gi, "") ||
    "Stay updated with the latest news and events in Patna.";
  const imageUrl = article.image || "/favicon.ico";
  const canonicalUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/${
    article.category || "uncategorized"
  }/${article.slug}`;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: metaTitle,
      description: metaDescription,
      alternates: {
        canonical: canonicalUrl,
      },
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      url: canonicalUrl,
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: metaTitle,
        },
      ],
    },
  };
}

const Page = async ({ params }) => {
  let article = null;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/article`,
      {
        params: { slug: params.slug },
      }
    );
    article = response.data.article;

    if (!article) {
      return <PageNotFound />;
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    return (
      <p className="text-center text-3xl flex justify-center items-center h-screen">
        There was a problem fetching the article. Please try again later.
      </p>
    );
  }
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/${article.category}/${article.slug}`;

  const formatDate = moment(article.updatedAt).format("MMMM Do YYYY");

  return (
    <>
      <div className="bg-gray-100 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-lg md:text-2xl font-medium text-black font-serif tracking-widest uppercase 
            hover:cursor-pointer underline underline-offset-4 decoration-4 decoration-dotted"
          >
            Patnaites News
          </Link>
          <ReportBtn slug={article.slug} />
        </div>

        <div className="text-center my-10 md:my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[800px] mx-auto">
            {article.title}
          </h1>
          <div className="mt-2 md:mt-10 max-w-[740px] mx-auto text-xs sm:text-base">
            <span>- {article.author}</span>
            <span> | </span>
            <span>{formatDate}</span>
          </div>
        </div>
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-50px] md:mt-[-80px] mb-10">
        <Image
          className="w-full h-[15] sm:h-[18rem] md:h-[20rem] lg:h-[28rem] rounded-md shadow-md border-4 border-white"
          src={article.image}
          alt={article.title || "image"}
          width={1280}
          height={720}
        />
        <div className="flex justify-between items-center my-4 md:my-8">
          <p className="px-1 inline-block bg-black text-white text-sm md:text-base">
            {article.category}
          </p>

          <div className="flex justify-end ">
            <SocialShare url={shareUrl} />
          </div>
        </div>

        <div>{parse(article.description)}</div>
      </div>

      <Footer />
    </>
  );
};

export default Page;

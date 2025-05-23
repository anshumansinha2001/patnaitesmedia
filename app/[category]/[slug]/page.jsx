import Footer from "@/components/Footer";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Link from "next/link";
import parse from "html-react-parser";
import SocialShare from "@/components/ArticleComponents/SocialShare";
import PageNotFound from "@/app/not-found";
import ReportBtn from "@/components/ArticleComponents/ReportBtn";
import AdsBetweenCard from "@/components/AdsComponents/AdsBetweenCard";
import AdsBottomCard from "@/components/AdsComponents/AdsBottomCard";

const Page = async ({ params }) => {
  let article = null;

  // Fetch the article from the API
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

  //  Fetch betweend ads from API
  //  Use an absolute URL for fetching ads to avoid any issues during SSR.
  let betweensAds = null;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/between-ad`
    );

    betweensAds = response.data.ads;
  } catch (error) {
    console.log(error);
  }

  const shareUrl = `${
    process.env.NEXT_PUBLIC_DOMAIN
  }/${article.category.toLowerCase()}/${article.slug}`;

  const formatDate = moment(article.updatedAt).format("MMMM Do YYYY");

  // Split the description into three parts
  const splitDescription = (description, wordCount) => {
    const words = description.split(" ");
    const firstPart = words.slice(0, wordCount).join(" ");
    const secondPart = words.slice(wordCount, wordCount + 200).join(" ");
    const thirdPart = words.slice(wordCount + 150).join(" ");
    return { firstPart, secondPart, thirdPart };
  };

  const { firstPart, secondPart, thirdPart } = splitDescription(
    article.description,
    250
  );

  // Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: article.image,
    author: {
      "@type": "Person",
      name: article.author,
    },
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    articleSection: article.category,
    description: article.description.replace(/(<([^>]+)>)/gi, ""),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${
        process.env.NEXT_PUBLIC_DOMAIN
      }/${article.category.toLowerCase()}/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="bg-gray-100 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex gap-1 text-md md:text-2xl font-medium text-black font-serif tracking-widest uppercase 
     hover:cursor-pointer underline underline-offset-4
     decoration-4 decoration-dotted"
          >
            Patnaites Media
            <Image
              src={assets.blue_tick}
              className="w-6 md:w-8"
              alt="blue tick"
            />
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
          loading="eager"
          quality={100}
        />
        <div className="flex justify-between items-center my-4 md:my-8">
          <p className="px-1 inline-block bg-black text-white text-sm md:text-base">
            {article.category}
          </p>

          <div className="flex justify-end ">
            <SocialShare url={shareUrl} />
          </div>
        </div>

        <div>{parse(firstPart)}</div>
        {betweensAds?.[0] && (
          <AdsBetweenCard
            image={betweensAds[0].image}
            link={betweensAds[0].link}
          />
        )}
        <div>{parse(secondPart)}</div>
        {betweensAds?.[1] && (
          <AdsBetweenCard
            image={betweensAds[1].image}
            link={betweensAds[1].link}
          />
        )}
        <div>{parse(thirdPart)}</div>
      </div>
      <AdsBottomCard />
      <Footer />
    </>
  );
};

// Generate metadata for the found article
export async function generateMetadata({ params }) {
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
      title: "Post not found | Patnaites",
      description: "The article you are looking for does not exist.",
    };
  }

  // Construct metadata for the found article
  const metaTitle =
    article.title.slice(0, 57).concat("...") || "Patnaites Media";
  const metaDescription =
    article.description
      .replace(/(<([^>]+)>)/gi, "")
      .slice(0, 127)
      .concat("...") ||
    "Stay updated with the latest news and events in Patna.";
  const imageUrl = article.image || "/favicon.ico";
  const canonicalUrl = `${
    process.env.NEXT_PUBLIC_DOMAIN
  }/${article.category.toLowerCase()}/${article.slug}`;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      type: "article",
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
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
  };
}

export default Page;

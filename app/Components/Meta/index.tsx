import Head from "next/head";

interface IProps {
  title: string;
  keyword?: string;
  description?: string;
}

const Meta: React.FC<IProps> = ({ title, keyword, description }) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
      <meta name="author" content="Razu Islam" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* <!-- ==== Metadata for SEO ==== --> */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="I am a software engineer and a web developer"
      />
      <meta
        name="description"
        content="I am a web developer and a full stack developer. I have a passion for creating clean and beautiful websites."
      />
      <meta property="og:site_name" content="Razu Islam" />
      <meta property="og:image:width" content="1600" />
      <meta property="og:image:height" content="900" />
      <meta
        property="og:description"
        content="React Personal Portfolio Tailwind CSS Template"
      />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Razu Islam",
  keyword: "Razu Islam, Full Stack developer",
  description:
    "I'm a full stack developer and a web developer. I have a passion for creating clean and beautiful websites.",
};

export default Meta;

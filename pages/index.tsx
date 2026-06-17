import Head from "next/head";
import Terminal from "../components/terminal/Terminal";
import { terminalResume } from "../data/terminalResume";

const { name, role } = terminalResume;
const TITLE = `${name} — ${role} // interactive terminal resume`;
const DESCRIPTION =
  "Explore Vincent Vitale's resume as an interactive command line. Type or click commands like ls, cat experience, and whoami to browse experience, projects, and skills.";
const URL = terminalResume.links.site;

const IndexPage = () => (
  <>
    <Head>
      <title>{TITLE}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={DESCRIPTION} />
      <meta name="theme-color" content="#08090c" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:url" content={URL} />
      <meta property="og:site_name" content={name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
    </Head>
    <Terminal />
  </>
);

export default IndexPage;

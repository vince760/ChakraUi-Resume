import React, { ReactNode } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import SideNav from "./SideNav";
import { PersonalInfo } from "../types/resume";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  personalInfo: PersonalInfo;
};

const Layout = ({
  children,
  title = "Resume",
  description = "Professional Resume",
  personalInfo
}: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <SideNav personalInfo={personalInfo}>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </SideNav>
  </>
);

export default Layout;

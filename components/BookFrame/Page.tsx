import { Box } from "@chakra-ui/react";
import React, { forwardRef } from "react";

type PageProps = {
  children: React.ReactNode;
};

const Page = forwardRef<HTMLDivElement, PageProps>(({ children }: PageProps, ref) => {
  return (
    <Box
      p={4}
      background={"url(/images/page-background.jpeg)"}
      boxSizing={"border-box"}
      boxShadow={"0 1.5em 3em -1em rgb(70, 69, 69)"}
      ref={ref}
      data-density={"soft"}
    >
      {children}
    </Box>
  );
});

export default Page;

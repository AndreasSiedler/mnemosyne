import React, { forwardRef, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Box, Button, IconButton, Textarea } from "@chakra-ui/react";
import { map } from "lodash";
import { Post } from "../../API";
import PageItem from "./PageItem";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

type PageCoverProps = {
  children: React.ReactNode;
  pos: string;
};

const PageCover = forwardRef<HTMLDivElement, PageCoverProps>(
  ({ children, pos }: PageCoverProps, ref) => {
    return (
      <div className={"page page-cover page-cover-" + pos} ref={ref} data-density="hard">
        <div className="page-content">
          <h2>{children}</h2>
        </div>
      </div>
    );
  }
);

type PageProps = {
  children: React.ReactNode;
  number: number;
  image: string;
};

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ number, image, children }: PageProps, ref) => {
    return (
      <Box paddingY={5} className="page" ref={ref} data-density={"soft"}>
        <div className="page-content">
          <div className="page-text">{children}</div>
        </div>
      </Box>
    );
  }
);

type BookFrameProps = {
  posts: Post[];
};

export default function BookFrame({ posts }: BookFrameProps) {
  let flipBook = useRef() as any;

  const handlePreviousClick = () => {
    flipBook.pageFlip().flipPrev();
  };

  const handleNextClick = () => {
    flipBook.pageFlip().flipNext();
  };

  return (
    <div>
      <div className="container-md" style={{ position: "relative" }}>
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={handlePreviousClick}
          aria-label={"Previous post"}
        />
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={handleNextClick}
          aria-label={"Next post"}
        />
        <HTMLFlipBook
          disableFlipByClick={true}
          width={550}
          height={733}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="demo-book"
          ref={(el) => (flipBook = el)}
        >
          <PageCover key={101} pos="bottom">
            One line by day
          </PageCover>
          {map(posts, (post, index) => (
            <Page key={post.id} image={index + ".jpg"} number={index + 1}>
              <PageItem post={post} />
            </Page>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
}

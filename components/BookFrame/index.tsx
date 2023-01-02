import React, { forwardRef, ReactNode, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Box, Button, HStack, IconButton } from "@chakra-ui/react";
import { findIndex } from "lodash";
import { Post } from "../../API";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

type PageCoverProps = {
  children: React.ReactNode;
  pos: string;
};

const PageCover = forwardRef<HTMLDivElement, PageCoverProps>(
  ({ children, pos }: PageCoverProps, ref) => {
    return (
      <Box
        background={"url(https://i.imgur.com/mzp2Uub.jpg)"}
        backgroundSize={"cover"}
        ref={ref}
        data-density="hard"
      >
        {children}
      </Box>
    );
  }
);

type BookFrameProps = {
  posts: Post[];
  children: ReactNode;
};

export default function BookFrame({ posts, children }: BookFrameProps) {
  const router = useRouter();
  const { date } = router.query;

  let flipBook = useRef() as any;

  const handlePreviousClick = () => {
    flipBook.pageFlip().flipPrev();
  };

  const handleNextClick = () => {
    flipBook.pageFlip().flipNext();
  };

  const turnToPage = () => {
    flipBook.pageFlip().flip(4);
  };

  return (
    <>
      <HStack justifyContent={"center"} mb={1}>
        <Box>
          <IconButton
            variant={"ghost"}
            icon={<ChevronLeftIcon />}
            onClick={handlePreviousClick}
            aria-label={"Previous post"}
          />
          <Button size={"sm"} variant={"ghost"} onClick={() => turnToPage()}>
            Today
          </Button>
          <IconButton
            variant={"ghost"}
            icon={<ChevronRightIcon />}
            onClick={handleNextClick}
            aria-label={"Next post"}
          />
        </Box>
      </HStack>
      <HTMLFlipBook
        drawShadow={true}
        startPage={findIndex(posts, { date: date as string }) + 1}
        disableFlipByClick={false}
        width={550}
        height={733}
        size="stretch"
        minWidth={315}
        maxWidth={2000}
        minHeight={100}
        maxHeight={2533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="flip-book html-book demo-book"
        style={{ backgroundImage: "url(images/background.jpg)" }}
        ref={(el) => (flipBook = el)}
        flippingTime={800}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={5}
        showPageCorners={false}
        onFlip={(data) =>
          router.push({ pathname: "diary", query: { date: posts[data.data].date } }, undefined, {
            shallow: true,
          })
        }
      >
        {children}
      </HTMLFlipBook>
    </>
  );
}

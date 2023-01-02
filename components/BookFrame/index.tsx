import React, { forwardRef, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Box, Button, Flex, HStack, IconButton } from "@chakra-ui/react";
import { findIndex, isEmpty, map } from "lodash";
import { Post } from "../../API";
import PageItem from "./PageItem";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { isOdd } from "../../utils/general";

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

type BookFrameProps = {
  posts: Post[];
};

export default function BookFrame({ posts }: BookFrameProps) {
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
        {map(posts, (post, index) => (
          <Page key={post.date}>
            <Flex justifyContent={["flex-end", isOdd(index) ? "flex-end" : "flex-start"]}>
              <Button
                variant={"solid"}
                onClick={() => {
                  const page = flipBook.pageFlip().getCurrentPageIndex();
                  flipBook.pageFlip().turnToPage(page);
                  router.push(
                    {
                      pathname: "diary",
                      query: {
                        edit: true,
                        editDate: post.date,
                        editId: !isEmpty(post.id) ? post.id : undefined,
                        date: date,
                      },
                    },
                    undefined,
                    { shallow: true }
                  );
                }}
              >
                Edit
              </Button>
            </Flex>
            <PageItem post={post} />
          </Page>
        ))}
      </HTMLFlipBook>
    </>
  );
}

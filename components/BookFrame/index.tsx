import React, { forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Box } from "@chakra-ui/react";
import { map } from "lodash";
import { Post } from "../../API";
import PageItem from "./PageItem";

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
  const onPage = () => {};

  const onChangeOrientation = () => {};

  const onChangeState = () => {};

  return (
    <div>
      <div className="container-md" style={{ position: "relative" }}>
        <HTMLFlipBook
          drawShadow={true}
          autoSize={true}
          disableFlipByClick
          width={550}
          height={733}
          size="stretch"
          minWidth={115}
          maxWidth={2000}
          minHeight={100}
          maxHeight={2533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={false}
          onFlip={onPage}
          onChangeOrientation={onChangeOrientation}
          onChangeState={onChangeState}
          className="flip-book html-book demo-book"
          style={{ backgroundImage: "url(images/background.jpg)" }}
          startPage={0}
          flippingTime={2}
          usePortrait={false}
          startZIndex={0}
          clickEventForward={false}
          useMouseEvents={true}
          swipeDistance={0}
          showPageCorners={false} // ref={(el) => (flipBook = el)}
        >
          <PageCover key={101} pos="bottom">
            THE END
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

import React, { forwardRef, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Box, Button, Textarea } from "@chakra-ui/react";
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
  let flipBook = useRef();
  const [isDisabled, setIsDisabled] = useState(false);

  const onPage = () => {};

  const onChangeOrientation = () => {};

  const onChangeState = () => {
    console.log("onChangeState");
  };

  const handleNextClick = () => {
    console.log("flipbook", flipBook.current);
    (flipBook as any)?.current?.getPageFlip().flipNext();
  };

  return (
    <div>
      <div className="container-md" style={{ position: "relative" }}>
        <Button onClick={() => setIsDisabled((value) => !value)}>Disable</Button>
        <Button onClick={handleNextClick}>Next</Button>
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

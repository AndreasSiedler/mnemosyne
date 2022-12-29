import React, { forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";

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
      <div className="page" ref={ref} data-density={"soft"}>
        <div className="page-content">
          <h2 className="page-header">Page header - {number}</h2>
          <div
            className="page-image"
            style={{ backgroundImage: "url(images/html/" + image + ")" }}
          ></div>
          <div className="page-text">{children}</div>
          <div className="page-footer">{number + 1}</div>
        </div>
      </div>
    );
  }
);

export default function BookFrame() {
  const onPage = () => {};

  const onChangeOrientation = () => {};

  const onChangeState = () => {};

  return (
    <div>
      <div className="container-md" style={{ position: "relative" }}>
        <HTMLFlipBook
          width={550}
          height={733}
          size="stretch"
          minWidth={115}
          maxWidth={2000}
          minHeight={100}
          maxHeight={2533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onPage}
          onChangeOrientation={onChangeOrientation}
          onChangeState={onChangeState}
          className="flip-book html-book demo-book"
          style={{ backgroundImage: "url(images/background.jpg)" }}
          // ref={(el) => (flipBook = el)}
        >
          <PageCover key={101} pos="bottom">
            THE END
          </PageCover>
          <Page image={1 + ".jpg"} number={0 + 1}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non
            convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer
            non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra
            metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed,
            viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non
            convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer
            non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra
            metus, a venenatis tellus tellus id magna.
          </Page>
          <Page image={2 + ".jpg"} number={1 + 1}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non
            convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer
            non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra
            metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed,
            viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non
            convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer
            non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra
            metus, a venenatis tellus tellus id magna.
          </Page>
          <Page image={3 + ".jpg"} number={2 + 1}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non
            convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer
            non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra
            metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed,
            viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non
            convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer
            non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra
            metus, a venenatis tellus tellus id magna.
          </Page>
          <Page image={4 + ".jpg"} number={3 + 1}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non
            convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer
            non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra
            metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed,
            viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non
            convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer
            non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra
            metus, a venenatis tellus tellus id magna.
          </Page>
        </HTMLFlipBook>
      </div>
    </div>
  );
}

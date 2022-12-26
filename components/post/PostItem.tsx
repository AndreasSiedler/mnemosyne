import { Box, Center, useColorModeValue, IconButton } from "@chakra-ui/react";
import { Post } from "../../API";
import { DeleteIcon } from "@chakra-ui/icons";
import { BiPencil } from "react-icons/bi";
import { useRouter } from "next/router";
import DynamicImage from "../DynamicImage";
import { first } from "lodash";
import { Editable, Slate, withReact } from "slate-react";
import { useCallback, useMemo } from "react";
import { createEditor } from "slate";
import { Element } from "../texteditor/Element";

type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback((props: any) => <Element {...props} />, []);

  const router = useRouter();
  const params = router.query;
  const bigImage = first(post.images?.items);

  function handlePostEdit() {
    router.push({ pathname: "posts", query: { postEditId: post.id, ...params } });
  }

  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"md"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box h={"210px"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
          {bigImage && <DynamicImage imageKey={bigImage?.fullSize.key as string} />}
          <Box position={"absolute"} right={0} p={2}>
            <IconButton icon={<DeleteIcon />} aria-label={"Delete post"} mr={1} />
            <IconButton icon={<BiPencil />} aria-label={"Delete post"} onClick={handlePostEdit} />
          </Box>
        </Box>
        <Slate editor={editor} value={post?.content ? JSON.parse(post?.content) : []}>
          <Editable renderElement={renderElement} readOnly placeholder="Enter some plain text..." />
        </Slate>
      </Box>
    </Center>
  );
}

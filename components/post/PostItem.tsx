import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { Post } from "../../API";
import { DeleteIcon } from "@chakra-ui/icons";
import { BiPencil } from "react-icons/bi";
import { useRouter } from "next/router";

type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  const router = useRouter();
  const params = router.query;

  function handlePostEdit() {
    router.push({ pathname: "posts", query: { postEditId: post.id, ...params } });
  }

  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"lg"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box h={"210px"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
          <Image
            alt=""
            src={
              "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
            fill
          />
          <Box position={"absolute"} right={0} p={2}>
            <IconButton icon={<DeleteIcon />} aria-label={"Delete post"} mr={1} />
            <IconButton icon={<BiPencil />} aria-label={"Delete post"} onClick={handlePostEdit} />
          </Box>
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            Blog
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            Boost your conversion rate
          </Heading>
          <Text color={"gray.500"}>{post.content}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar src={"https://avatars0.githubusercontent.com/u/1164541?v=4"} />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}

import React, { useEffect } from "react";
import Head from "next/head";
import Footer from "./Footer";
import {
  Text,
  Box,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  useDisclosure,
  FlexProps,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../store/hooks";
import { loadUser } from "../../store/user";
import { FiBell, FiMenu } from "react-icons/fi";
import ProfileMenu from "../user/ProfileMenu";
import { ColorModeButton } from "./ColorModeButton";

type LayoutProps = {
  children: any;
  title?: string;
};

const DashLayout = ({ children, title = "Book Best Hotels for your Holiday" }: LayoutProps) => {
  const { onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("Rendered");
    dispatch(loadUser());
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <Sidebar onClose={() => onClose} display={{ base: "none", md: "block" }} />
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
          <Footer />
        </Box>
      </Box>
    </>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <ColorModeButton />
        <Flex alignItems={"center"}>
          <ProfileMenu />
        </Flex>
      </HStack>
    </Flex>
  );
};
export default DashLayout;

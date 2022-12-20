import React, { ReactElement, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  CircularProgress,
  HStack,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loadUser, UserState } from "../../../store/user";
import Logo from "../Logo";
import ProfileMenu from "../../user/ProfileMenu";
import { LOGIN_ROUTE } from "../../../pages/login";
import { ColorModeButton } from "../ColorModeButton";
import { ADMIN_NEW_ROOM_ROUTE } from "../../../pages/admin/rooms/new";
import { ADMIN_NEW_VENTURE_ROUTE } from "../../../pages/admin/ventures/new";

/**
 * Renders a header
 * @return {ReactElement}
 */
export default function Header(): ReactElement {
  const dispatch = useAppDispatch();
  const { status: userStatus }: UserState = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  /**
   * Renders account button or login button
   * @param {String} status
   * @return {ReactElement}
   */
  function rendersAccountButton(status: UserState["status"]) {
    switch (status) {
      case "userloaded":
        return <ProfileMenu />;
      case "loading":
        return <CircularProgress size={"7"} isIndeterminate />;
      default:
        return (
          <>
            <NextLink href={LOGIN_ROUTE}>
              <Link colorScheme={"teal"}>Login</Link>
            </NextLink>
            <NextLink href={ADMIN_NEW_VENTURE_ROUTE}>
              <Button variant={"outline"} colorScheme={"teal"}>
                Add Venture
              </Button>
            </NextLink>
          </>
        );
    }
  }

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Logo />
        </Box>

        <HStack spacing={5}>
          {userStatus === "userloaded" && (
            <NextLink href={ADMIN_NEW_ROOM_ROUTE}>
              <Button variant={"outline"} colorScheme={"teal"}>
                Create Room
              </Button>
            </NextLink>
          )}
          <ColorModeButton />
          {rendersAccountButton(userStatus)}
        </HStack>
      </Flex>
    </Box>
  );
}

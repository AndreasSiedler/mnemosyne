import { UseToastOptions } from "@chakra-ui/toast";

export const toastPosition = "bottom-right";
export const toastSuccessConfig: UseToastOptions = {
  title: "Space updated.",
  description: "We've created your account for you.",
  status: "success",
  duration: 9000,
  isClosable: true,
  position: "bottom-right",
};
export const toastErrorConfig: UseToastOptions = {
  title: "Failure",
  description: "Something went wrong.",
  status: "error",
  duration: 9000,
  isClosable: true,
  position: "bottom-right",
};
export const zIndex = {
  navbar: 50,
};
export const routes = {
  dashboard: "/admin",
  dashboardProjects: "/admin/projects",
};

export const HOTKEYS: Record<string, string> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
};

// TODO: add a shortcut for indenting and dedenting list items
export const BLOCK_HOTKEYS: Record<string, string> = {
  "mod+alt+1": "heading-one",
  "mod+alt+2": "heading-two",
  "mod+alt+3": "heading-three",
  "mod+alt+4": "heading-four",
  "mod+.": "bulleted-list",
  "mod+/": "numbered-list",
};

export const LIST_TYPES: string[] = ["numbered-list", "bulleted-list"];

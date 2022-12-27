import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

type ConfirmationModalProps = {
  title: string;
  text: string;
  isOpen: boolean;
  isLoading: boolean;
  onOpen: () => void;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmationModal({
  title,
  text,
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{text}</ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={onConfirm} isLoading={isLoading}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

import { Box, Heading, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="full"
        _checked={{
          bg: "teal",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

type Props = {};

export default function Calendar({}: Props) {
  const router = useRouter();
  const currentDate = moment();

  const { date } = router.query;
  const weekStart = currentDate.clone().startOf("isoWeek");

  var days = [];
  for (var i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, "days").format("YYYY-MM-DD"));
  }

  const { getRootProps, getRadioProps, value } = useRadioGroup({
    name: "date",
    defaultValue: date as string,
    onChange: (date) => router.push({ pathname: "posts", query: { date: date } }),
  });

  const group = getRootProps();

  return (
    <>
      <Heading textAlign={"center"} as="h1" size={"md"}>
        {moment(value).format("DD.MM.YYYY")}
      </Heading>
      <HStack {...group} justify={"space-between"} mt={5}>
        {days.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {moment(value).format("DD")}
            </RadioCard>
          );
        })}
      </HStack>
    </>
  );
}

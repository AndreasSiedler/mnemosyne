import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import { map } from "lodash";
import moment from "moment";
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
        borderRadius="md"
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
  const currentDate = moment();
  const weekStart = currentDate.clone().startOf("isoWeek");
  var days = [];
  for (var i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, "days").toISOString());
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {days.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {moment(value).format("DD")}
          </RadioCard>
        );
      })}
    </HStack>
  );
}
function getRootProps() {
  throw new Error("Function not implemented.");
}

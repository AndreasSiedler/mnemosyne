import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, IconButton, useRadio, useRadioGroup } from "@chakra-ui/react";
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
        textAlign={"center"}
      >
        {props.children}
      </Box>
    </Box>
  );
}

const getWeekDayFromMoment = (momentNumber: number) => {
  switch (momentNumber) {
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    case 0:
      return "Sun";
    default:
      return "";
  }
};

export default function Calendar() {
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
    value: date as string,
    onChange: (date) => router.push({ pathname: "posts", query: { date: date } }),
  });

  const group = getRootProps();

  const handleDateLeftClick = () => {
    const newDate = moment(date).clone().subtract(1, "days").format("YYYY-MM-DD");
    router.push({ pathname: "posts", query: { date: newDate } });
  };

  const handleDateRightClick = () => {
    const newDate = moment(date).clone().add(1, "days").format("YYYY-MM-DD");
    router.push({ pathname: "posts", query: { date: newDate } });
  };

  return (
    <>
      <HStack justifyContent={"space-between"}>
        <Heading textAlign={"center"} as="h1" size={"md"}>
          {moment(date).format("DD.MM.YYYY")}
        </Heading>
        <Box>
          <IconButton
            aria-label="Previous day"
            icon={<ChevronLeftIcon />}
            onClick={handleDateLeftClick}
          />
          <IconButton
            aria-label="Next day"
            icon={<ChevronRightIcon />}
            onClick={handleDateRightClick}
          />
        </Box>
      </HStack>

      <HStack {...group} justify={"space-between"} mt={5}>
        {days.map((value) => {
          const radio = getRadioProps({ value });
          const momentWeekNumber = moment(value).weekday();
          const weekDay = getWeekDayFromMoment(momentWeekNumber);
          return (
            <RadioCard key={value} {...radio}>
              {weekDay} {moment(value).format("DD")}
            </RadioCard>
          );
        })}
      </HStack>
    </>
  );
}

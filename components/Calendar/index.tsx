import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, IconButton, useRadio, useRadioGroup } from "@chakra-ui/react";
import moment, { Moment } from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
        px={4}
        py={2}
        textAlign={"center"}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function getWeekDayFromMoment(momentNumber: number) {
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
}

function getMonthFromMoment(momentNumber: number) {
  switch (momentNumber) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "";
  }
}

function getWeedDaysFromWeekStart(weekStart: Moment) {
  let weekDays = [];
  for (var i = 0; i <= 6; i++) {
    weekDays.push(moment(weekStart).add(i, "days").format("YYYY-MM-DD"));
  }
  return weekDays;
}

export default function Calendar() {
  const router = useRouter();
  const currentDate = moment();
  const [days, setDays] = useState<string[]>([]);

  const { date } = router.query;

  useEffect(() => {
    const weekStart = currentDate.clone().startOf("isoWeek");
    setDays(getWeedDaysFromWeekStart(weekStart));
  }, []);

  const { getRootProps, getRadioProps, value } = useRadioGroup({
    name: "date",
    value: date as string,
    onChange: (date) => router.push({ pathname: "posts", query: { date: date } }),
  });

  const group = getRootProps();

  const handleDateLeftClick = () => {
    const currWeekStart = moment(days[0]);
    const previousWeekStart = currWeekStart.clone().subtract(7, "days");
    setDays(getWeedDaysFromWeekStart(previousWeekStart));
  };

  const handleDateRightClick = () => {
    const currWeekStart = moment(days[0]);
    const nextWeekStart = currWeekStart.clone().add(7, "days");
    setDays(getWeedDaysFromWeekStart(nextWeekStart));
  };

  return (
    <Box mb={10}>
      <HStack justifyContent={"space-between"}>
        <Heading textAlign={"center"} as="h1" size={"md"}>
          {getMonthFromMoment(moment(days[0]).month())} {moment(days[0]).year()}
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
    </Box>
  );
}

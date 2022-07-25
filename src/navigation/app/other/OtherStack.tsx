import React from "react";
import { Wrapper } from "../../../styled-components/ReusedUI";
import { Text } from "react-native";

interface OtherStackProps {}

export const DiscoverStack: React.FC<OtherStackProps> = ({}) => {
  return (
    <Wrapper>
      <Text>Hi I'm the Discover page!</Text>
    </Wrapper>
  );
};

export const MyListStack: React.FC<OtherStackProps> = ({}) => {
  return (
    <Wrapper>
      <Text>Hi I'm the My List page!</Text>
    </Wrapper>
  );
};

export const DirectMessagesStack: React.FC<OtherStackProps> = ({}) => {
  return (
    <Wrapper>
      <Text>Hi I'm the Direct Messages page!</Text>
    </Wrapper>
  );
};

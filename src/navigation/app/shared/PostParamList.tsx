export type PostParamList = {
  Post: {
    name: string;
  };

  SeePost: {
    name: string;
    like?: React.MutableRefObject<() => void>;
  };
};

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type AuthParamList = {
  Login: undefined;
  Register: undefined;
  LoginFailed: undefined;
  RegisterFailed: undefined;
  RegisterSuccess: undefined;
  ConfirmInfo: undefined;
  ForgetPassword: undefined;
  ResetPassword: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};

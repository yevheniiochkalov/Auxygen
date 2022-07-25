import { TextInput, View, Image } from 'react-native';
import { Button, Subheading, Caption } from 'react-native-paper';
import styled from 'styled-components/native';

/// --------------- -------- LAYOUT ---------------- ----------------- ///
// most basic wrapper to be used on all pages
export const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  padding: 30px;
`;

// good for forms and columns
export const StyledColumnView = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  margin: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const LineBreak = styled.View`
  height: 30px;
  width: 100%;
`;

/// --------------- -------- COMPONENTS ---------------- ----------------- ///
export const AuthTextInput = styled(TextInput)`
  border-radius: 40px;
  background-color: #432287;
  /* background-color: ${(props) => props.theme.colors.primary}; */
  border-color: ${(props) => props.theme.colors.accent};
  /* color: ${(props) => props.theme.colors.text}; */
  font-family: 'Montserrat_400Regular';
  color: white;
  border-width: 0.5px;
  padding: 15px;
`;

export const GradientButton = styled(Button)`
  background: rgb(2, 0, 36);
  background: linear-gradient(
    13deg,
    rgba(2, 0, 36, 1) 1%,
    rgba(98, 0, 234, 1) 43%,
    rgba(255, 255, 255, 0.007440476190476164) 100%
  );
`;

export const IconDescription = styled(Subheading)`
  margin-top: 12;
  margin-left: -6;
`;

export const Row = styled(View)`
  display: flex;
  flex-direction: row;
  align-content: flex-end;
`;

export const RowSpaceBetween = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const LeftColumn = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const SimpleColumn = styled(View)`
  display: flex;
  flex-direction: column;
`;

export const ThinLine = styled(View)`
  width: 90%;
  height: 0.4;
  margin-top: 7;
  margin-bottom: 15;
  background-color: ${(props) => props.theme.colors.darkText};
`;

export const OrangeCaption = styled(Caption)`
  color: ${(props) => props.theme.colors.accent};
  margin-right: 10px;
`;

export const RoundImage = styled(Image)`
  border-radius: 7px;
`;

export const CommentTextInput = styled(TextInput)`
  border-radius: 40px;
  background-color: #26274B;
  padding: 15px;
  width: 250px;
  height: 30px;
`;

// export const TextColorCaption = styled(Caption)`
//   color: ${(props) => props.theme.colors.text};
// `;

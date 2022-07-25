import { ErrorMessage, Formik } from 'formik';
import React from 'react';
import {
  Button,
  HelperText,
  TextInput,
  Title,
} from 'react-native-paper';

import {
  GetCurrentUserDocument,
  useEditUserNamesMutation,
  EditUserInput,
} from '../../../generated-components/apolloComponents';
import {
  LineBreak,
  StyledColumnView,
} from '../../../styled-components/ReusedUI';
import { EditNameValidationSchema } from '../../../utils/FormValidationSchemas';
import { useStoreState } from '../../../state-management/hooks';
import { deepPurple800 } from '../../../styled-components/colors';

interface EditNamesProps {
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
}
// TODO make placeholder existing username
export const EditNames: React.FC<EditNamesProps> = ({ setNext }) => {
  const [editUserNames] = useEditUserNamesMutation();
  // const { getCurrentUser: data } = client.readQuery<GetCurrentUserQuery>({
  //   query: GetCurrentUserDocument,
  // });
  const data = useStoreState((state) => state.user.user);
  // useEffect(() => {
  //   setNext(false);
  // }, []);

  const submitEditUserNames = async (name: string, username: string) => {
    const data: EditUserInput = {
      username,
      name,
    };
    try {
      const response = await editUserNames({
        variables: { data },
        refetchQueries: [{ query: GetCurrentUserDocument }],
      });
      if (response.data.editUserNames) {
        setNext(true);
      }
    } catch (err) {
      return err;
    }
  };

  const initialName: string = data.googleId || data.facebookId ? data.username : '';
  const initialUsername: string = initialName ? '' : data.username;

  return (
    <StyledColumnView>
      <Title>Edit your Username and Name</Title>

      <Formik
        initialValues={{ name: initialName, username: initialUsername }}
        onSubmit={({ name, username }) => {
          submitEditUserNames(name, username);
        }}
        validationSchema={EditNameValidationSchema}
      >
        {({
          handleChange, handleBlur, handleSubmit, values, resetForm,
        }) => (
          <StyledColumnView>
            <TextInput
              theme={{
                roundness: 1,
                colors: {
                  text: deepPurple800,
                },
              }}
              label="name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              // TODO: CHANGE ON SERVER
              value={values.name}
            />
            <HelperText>
              <ErrorMessage name="name" />
            </HelperText>

            <TextInput
              theme={{
                roundness: 1,
                colors: {
                  text: deepPurple800,
                },
              }}
              label="username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            <HelperText>
              <ErrorMessage name="username" />
            </HelperText>

            <LineBreak />
            <Button
              //   disabled={!values.name && !values.username}
              mode="contained"
              onPress={() => {
                handleSubmit();
              }}
            >
              Save Changes
            </Button>
          </StyledColumnView>
        )}
      </Formik>

      {/* <Caption>Use Side Arrows to Skip for Now</Caption> */}
    </StyledColumnView>
  );
};

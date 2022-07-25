import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { cyanB, grayPlaceholder } from '../../../styled-components/colors';

interface LengthPickerProps {
  days: number;
  setDays: React.Dispatch<React.SetStateAction<number>>;
}
export class LengthPicker extends React.PureComponent<LengthPickerProps> {
  handleChange = (value) => {
    this.props.setDays(value);
  }

  render() {
    const { days } = this.props;

    return (
      <>
        <Text style={styles.lengthSelectTitle}>Poll Length</Text>
        <View style={styles.picker}>
          <TouchableOpacity
            style={days !== 1 ? styles.pickerOption : [styles.pickerOption, styles.activeOption]}
            onPress={() => this.handleChange(1)}
          >
            <Text
              style={days !== 1 ? styles.label : [styles.label, styles.activeLabel]}
            >
              1 day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={days !== 2 ? styles.pickerOption : [styles.pickerOption, styles.activeOption]}
            onPress={() => this.handleChange(2)}
          >
            <Text
              style={days !== 2 ? styles.label : [styles.label, styles.activeLabel]}
            >
              2 day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={days !== 3 ? styles.pickerOption : [styles.pickerOption, styles.activeOption]}
            onPress={() => this.handleChange(3)}
          >
            <Text
              style={days !== 3 ? styles.label : [styles.label, styles.activeLabel]}
            >
              3 day
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  lengthSelectTitle: {
    color: grayPlaceholder,
    fontFamily: 'Montserrat_400Regular',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 20,
  },
  picker: {
    display: 'flex',
    flexDirection: 'row',
  },
  pickerItem: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Montserrat_500Medium',
  },
  label: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Montserrat_500Medium',
  },
  activeLabel: {
    color: cyanB,
  },
  pickerOption: {
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ffffff',
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
  },
  activeOption: {
    borderColor: cyanB,
  },
});

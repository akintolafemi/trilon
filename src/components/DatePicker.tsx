import React, {
  useState,
  useRef,
  FunctionComponent,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';
import moment from 'moment';
import DateTimePicker, {
  AndroidEvent,
  Event,
} from '@react-native-community/datetimepicker';
import {Colors, Fonts} from '../common';
import {DatePickerProps} from 'src/interfaces/input';
import VectorIcon from './VictorIcon';
import SlideModal, {sliderRef} from './SlideModal';
import TouchableButton from './TouchableButton';
import {onChange} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';

export interface MyInputHandles {
  checkValidation(): number;
  focusInput(): void;
}

const DatePicker: ForwardRefRenderFunction<MyInputHandles, DatePickerProps> = (
  {
    placeholder,
    optional,
    label,
    icon,
    future,
    loading = false,
    disabled,
    past,
    noLimit,
    initialValue,
    maxDate,
    minDate,
    onChange,
    noCheck,
    validationRules,
    containerStyle,
    textStyle
  },
  ref,
) => {
  const inputRef = useRef<any>(null);
  const slideModalRef = useRef<sliderRef>(null);
  const [error, setError] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (loaded) handleValidationCheck();
  }, [date, loaded]);

  useEffect(() => {
    if (initialValue) {
      setLoaded(true);
      setShowDate(false);
      setSelected(true);
      setDate(moment(initialValue).toDate());
      if (onChange) onChange(moment(initialValue).format('YYYY-MM-DD'));
    }
  }, [initialValue]);

  useImperativeHandle(ref, () => ({
    checkValidation: () => {
      console.log('ldfldkfdkfdlfkldate');
      let errorCount = validate();
      return errorCount;
    },
    focusInput: () => {},
  }));

  function handleOnSelectPress() {
    if (loading || disabled) {
      return;
    }

    setShowDate(true);
    slideModalRef.current?.toggleModal();
  }

  function getDateText(): string {
    if (date && selected) {
      return moment(date).format('DD/MM/YYYY');
    }

    return placeholder || 'DD/MM/YYYY';
  }
  function renderDate() {
    return (
      <TouchableWithoutFeedback onPress={handleOnSelectPress}>
        <View>
          <View
            style={[{
              flexDirection: 'row',
              // height: Fonts.h(50),
              justifyContent: 'space-between',
              borderColor: error ? Colors.danger : Colors.darkText,
              alignItems: 'center',
              backgroundColor: Colors.white,
              height: Fonts.h(50),
            }, containerStyle]}>
            <View>
              <Text
                style={textStyle}>
                {getDateText()}
              </Text>
            </View>
            {!loading ? (
              null
            ) : loading ? (
              <ActivityIndicator
                style={{
                  width: Fonts.w(24),
                  height: Fonts.w(24),
                  marginRight: Fonts.w(12),
                }}
              />
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  function handleValidationCheck() {
    if (noCheck) {
      return;
    }

    setError(false);
    setErrorMessage('');
    // Validate
    validate();
  }

  function validate(): number {
    if (validationRules) {
      const isRequired = validationRules.includes('required');
      if (isRequired && !selected) {
        setError(true);
        setErrorMessage('Date is required');
        return 1;
      }
    }

    return 0;
  }

  function handleOnChange(event: Event, selectedDate?: Date) {
    setLoaded(true);
    setShowDate(false);
    setSelected(true);

    if (selectedDate) setDate(selectedDate);
    if (onChange) onChange(moment(selectedDate).format('YYYY-MM-DD'));
  }
  function renderModal() {
    return (
      <SlideModal ref={slideModalRef} height={Fonts.h(750)} fullHeight={false}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: Fonts.h(8),
              paddingBottom: Fonts.h(6),
              borderBottomColor: Colors.indicatorBackground,
              borderBottomWidth: 1,
              paddingLeft: Fonts.w(20),
            }}>
            <View style={{padding: Fonts.h(10)}} />
            <Text
              style={{
                color: Colors.fineGray,
                fontFamily: Fonts.AVERTA_SEMIBOLD,
                fontSize: Fonts.w(14),
              }}>
              {label || 'Select date'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (
                  slideModalRef &&
                  slideModalRef.current &&
                  slideModalRef.current.closeModal
                ) {
                  slideModalRef.current.closeModal();
                }
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: Fonts.h(10),
                  paddingRight: Fonts.w(20),
                }}>
                <VectorIcon
                  name="close"
                  size={Fonts.w(20)}
                  color={Colors.darkText}
                />
              </View>
            </TouchableOpacity>
          </View>
          {renderDatePicker()}

          <TouchableButton
            title="Set date"
            onPress={() => {
              if (
                slideModalRef &&
                slideModalRef.current &&
                slideModalRef.current.closeModal
              ) {
                slideModalRef.current.closeModal();
              }
              setSelected(true);
              setLoaded(true);
              if (onChange)
                onChange(
                  date
                    ? moment(date).format('YYYY-MM-DD')
                    : moment().format('YYYY-MM-DD'),
                );
            }}
            style={{
              backgroundColor: Colors.blue,
              borderRadius: Fonts.w(6),
              marginHorizontal: Fonts.w(26),
            }}
          />
        </View>
      </SlideModal>
    );
  }

  function renderDatePicker() {
    return (
      <View>
        {!!showDate || Platform.OS === 'ios' ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            // is24Hour={true}
            display="spinner"
            onChange={handleOnChange}
            textColor="#AAB7C6"
            maximumDate={
              past && !noLimit
                ? new Date()
                : maxDate
                ? new Date(maxDate)
                : undefined
            }
            minimumDate={
              future ? new Date() : minDate ? new Date(minDate) : undefined
            }
          />
        ) : null}
      </View>
    );
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={handleOnSelectPress}>
        <View>{renderDate()}</View>
      </TouchableWithoutFeedback>
      {Platform.OS === 'android' ? renderDatePicker() : renderModal()}
    </>
  );
};

export default forwardRef(DatePicker);

import { useState } from "react";
import { useIntl } from "react-intl";
import {
  Typography,
  Flex,
  Field,
  FieldHint,
  FieldError,
  // @ts-ignore
} from "@strapi/design-system";
import { PhoneNumberUtil } from "google-libphonenumber";
import { PhoneInput } from "react-international-phone";
import { CSSProperties } from "styled-components";
import "react-international-phone/style.css";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const mainStyles: CSSProperties = {
  height: "40px",
  padding: "0 8px",
};

const Input = (props: any) => {
  const [phone, setPhone] = useState<string>(props.value || "");
  const isValid = isPhoneValid(phone);

  const defaultCountry = props.attribute?.options?.country || "us";

  const { formatMessage } = useIntl();

  const handlePhoneChange = async (phoneNr: string) => {
    setPhone(phoneNr);

    props.onChange({
      target: {
        name: props.name,
        value: phoneNr,
        type: props.attribute.type,
      },
    });
  };

  return (
    <Field
      name={props.name}
      id={props.name}
      // GenericInput calls formatMessage and returns a string for the error
      error={props.error}
      hint={props.description && formatMessage(props.description)}
      required={props.required}
    >
      <Flex gap="4px" flexDirection="column" wrap="wrap" alignItems="stretch">
        <Typography variant="pi" fontWeight="bold">
          {formatMessage(props.intlLabel)}
        </Typography>

        <PhoneInput
          style={{
            width: "100%",
          }}
          inputStyle={{
            ...mainStyles,
            width: "100%",
            borderColor: !isValid
              ? "#d02b20 #d02b20 #d02b20 #dcdce4"
              : "#dcdce4",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
          }}
          countrySelectorStyleProps={{
            buttonContentWrapperStyle: {
              gap: "4px",
            },
            dropdownStyleProps: {
              style: {
                borderRadius: "4px",
              },
            },
            buttonStyle: {
              ...mainStyles,
              borderColor: !isValid
                ? "#d02b20 #dcdce4 #d02b20 #d02b20"
                : "#dcdce4",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
            },
          }}
          defaultCountry={defaultCountry}
          value={phone}
          onChange={handlePhoneChange}
        />
        {!isValid && (
          <Typography variant="pi" textColor="danger700">
            This is an invalid phone number
          </Typography>
        )}
        <FieldHint />
        <FieldError />
      </Flex>
    </Field>
  );
};

export default Input;

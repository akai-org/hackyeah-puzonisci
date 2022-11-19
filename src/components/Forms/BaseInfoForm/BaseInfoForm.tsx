import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  FormLabel,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MultiSelect } from 'chakra-multiselect';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { useIsMobile } from '../../../hooks';
import s from './BaseInfoForm.module.scss';

interface BaseInfoValues {
  firstName: string;
  lastName: string;
  weight: number;
}

interface Option {
  value: string;
  label: string;
  isAllowed: boolean;
}

const options = [
  { value: 'dupa1', label: 'dupa1', isAllowed: true },
  { value: 'dupa2', label: 'dupa2', isAllowed: true },
  { value: 'dupa3', label: 'dupa3', isAllowed: false },
  { value: 'dupa4', label: 'dupa4', isAllowed: false },
];

export const BaseInfoForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<BaseInfoValues>();
  const [values, setValues] = useState<Array<string>>([]);
  const [productsToCheck, setProductsToCheck] = useState<Array<Option>>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const isMobile = useIsMobile();

  function onSubmit(vals: BaseInfoValues) {
    setSelectError(false);
    setProductsToCheck(
      values.map((value) => {
        const index = options.findIndex((option) => option.value === value);
        return options[index];
      }),
    );
    values.length > 0 ? setIsSubmitted(true) : setSelectError(true);
  }

  return isSubmitted ? (
    <Flex
      flexDirection="column"
      width={isMobile ? '100vw' : 'auto'}
      pr={isMobile ? '100px' : ''}
    >
      <Flex flexDirection="column">
        <Text color="red">
          <CloseIcon /> Niekompostowalne
        </Text>
        <Box>
          {productsToCheck
            .filter((product) => !product.isAllowed)
            .map((item) => (
              <Box key={item.value}>- {item.value}</Box>
            ))}
        </Box>
      </Flex>
      <Flex mt="20px" flexDirection="column">
        <Text color="green">
          <CheckIcon /> Kompostowalne
        </Text>
        <Box>
          {productsToCheck
            .filter((product) => product.isAllowed)
            .map((item) => (
              <Box key={item.value}>- {item.value}</Box>
            ))}
        </Box>
      </Flex>
    </Flex>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className={isMobile ? s.form : ''}>
      <FormControl isInvalid={Boolean(errors.firstName)}>
        <FormLabel htmlFor="firstName">Imię</FormLabel>
        <Input
          id="firstName"
          {...register('firstName', {
            required: 'Wprowadź imię',
          })}
        />
        <FormErrorMessage>
          {errors.firstName && errors.firstName.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt="20px" isInvalid={Boolean(errors.lastName)}>
        <FormLabel htmlFor="lastName">Nazwisko</FormLabel>
        <Input
          id="lastName"
          {...register('lastName', {
            required: 'Wprowadź nawisko',
          })}
        />
        <FormErrorMessage>
          {errors.lastName && errors.lastName.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt="20px" isInvalid={Boolean(errors.lastName)}>
        <FormLabel htmlFor="weight">
          Miesięczna waga kompostowanych odpadów(kg)
        </FormLabel>
        <Input
          type="number"
          id="weight"
          {...register('weight', {
            required: 'Wprowadź wagę',
            valueAsNumber: true,
          })}
        />
        <FormErrorMessage>
          {errors.weight && errors.weight.message}
        </FormErrorMessage>
      </FormControl>
      <FormLabel mt="20px" htmlFor="items">
        Kompostowane rzeczy
      </FormLabel>
      <MultiSelect
        border="1px solid red"
        textAlign="left"
        options={options}
        value={values}
        onChange={(items) => setValues(items as Array<string>)}
      />

      {selectError && (
        <Text color="red" fontSize="14px" textAlign="left">
          Wybierz przynajmniej jedną rzecz
        </Text>
      )}
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Sprawdź
      </Button>
    </form>
  );
};

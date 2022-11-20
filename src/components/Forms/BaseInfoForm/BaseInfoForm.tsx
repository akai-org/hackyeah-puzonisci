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
  {
    value: 'Fusy z kawy/herbaty',
    label: 'Fusy z kawy/herbaty',
    isAllowed: true,
  },
  { value: 'Skoszona trawa', label: 'Skoszona trawa', isAllowed: true },
  { value: 'Skorupki z jajek', label: 'Skorupki z jajek', isAllowed: true },
  { value: 'Liście', label: 'Liście', isAllowed: true },
  { value: 'Czerstwe pieczywo', label: 'Czerstwe pieczywo', isAllowed: true },
  { value: 'Gałęzie/kora', label: 'Gałęzie/kora', isAllowed: true },
  { value: 'Zwiędłe rośliny', label: 'Zwiędłe rośliny', isAllowed: true },
  { value: 'Pędy roślin', label: 'Pędy roślin', isAllowed: true },
  { value: 'Popiół', label: 'Popiół', isAllowed: true },
  { value: 'Obierki', label: 'Obierki', isAllowed: true },
  { value: 'Całe jajka', label: 'Całe jajka', isAllowed: false },
  { value: 'Nabiał', label: 'Nabiał', isAllowed: false },
  { value: 'Mięso', label: 'Mięso', isAllowed: false },
  { value: 'Kości', label: 'Kości', isAllowed: false },
  { value: 'Kamienie', label: 'Kamienie', isAllowed: false },
  { value: 'Odchody zwierzęce', label: 'Odchody zwierzęce', isAllowed: false },
  { value: 'Plastik', label: 'Plastik', isAllowed: false },
  { value: 'Szkło', label: 'Szkło', isAllowed: false },
  { value: 'Metal', label: 'Metal', isAllowed: false },
  { value: 'Obierki cytrusów', label: 'Obierki cytrusów', isAllowed: false },
  { value: 'Wędliny', label: 'Wędliny', isAllowed: false },
  { value: 'Gazety', label: 'Gazety', isAllowed: false },
  { value: 'Tłuste odpadki', label: 'Tłuste odpadki', isAllowed: false },
  {
    value: 'Rośliny zaatakowane przez pasożyty',
    label: 'Rośliny zaatakowane przez pasożyty',
    isAllowed: false,
  },
  {
    value: 'Rośliny skażone środkami chemicznymi ',
    label: 'rośliny skażone środkami chemicznymi',
    isAllowed: false,
  },
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

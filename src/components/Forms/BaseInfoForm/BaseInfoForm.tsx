import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  FormLabel,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MultiSelect } from 'chakra-multiselect';

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
  { value: 'dupa3', label: 'dupa3', isAllowed: true },
  { value: 'dupa4', label: 'dupa4', isAllowed: true },
];

export const BaseInfoForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<BaseInfoValues>();
  const [values, setValues] = useState<Array<string>>([]);
  const [productsToCheck, setProductsToCheck] = useState<Array<Option>>([]);

  console.log('productsToCheck');
  console.log(productsToCheck);

  function onSubmit(vals: BaseInfoValues) {
    setProductsToCheck(
      values.map((value) => {
        const index = options.findIndex((option) => option.value === value);
        return options[index];
      }),
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        textAlign="left"
        options={options}
        value={values}
        onChange={(items) => setValues(items as Array<string>)}
      />
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Sprawdź
      </Button>
    </form>
  );
};

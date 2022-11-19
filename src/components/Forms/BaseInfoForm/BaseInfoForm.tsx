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

const options = [
  'dupa1',
  'dupa2',
  'dupa3',
  'dupa4',
  'dupa5',
  'dupa6',
  'dupa7',
  'dupa8',
  'dupa9',
  'dupa10',
];

const getPromise = () => {
  return new Promise<number>((resolve, reject) => {
    resolve(1000);
  });
};

export const BaseInfoForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<BaseInfoValues>();
  const [value, setValue] = useState<Array<string>>([]);

  function onSubmit(values: BaseInfoValues) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        getPromise();
      }, 3000);
    });
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
        value={value}
        onChange={(items) => setValue(items as Array<string>)}
      />
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Sprawdź
      </Button>
    </form>
  );
};

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
  name: string;
  allowed: boolean;
}

const options: Array<Option> = [
  { name: 'dupa1', allowed: true },
  { name: 'dupa2', allowed: false },
  { name: 'dupa3', allowed: true },
  { name: 'dupa4', allowed: true },
  { name: 'dupa5', allowed: true },
  { name: 'dupa6', allowed: true },
  { name: 'dupa7', allowed: true },
  { name: 'dupa8', allowed: true },
  { name: 'dupa9', allowed: true },
  { name: 'dupa10', allowed: true },
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
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  function onSubmit(values: BaseInfoValues) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        getPromise();
      }, 3000);
      setIsSubmitted(true);
    });
  }

  return isSubmitted ? (
    <div>dupa</div>
  ) : (
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

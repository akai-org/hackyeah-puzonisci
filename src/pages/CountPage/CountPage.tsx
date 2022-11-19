import { BaseInfoForm, Section } from '../../components';
import { Box } from '@chakra-ui/react';

export const CountPage = () => {
  return (
    <Section
      title="Dowiedz się czy poprawnie kompostujesz!"
      content={
        <Box mx="auto" width="700px" p="40px">
          <BaseInfoForm />
        </Box>
      }
      isEven={false}
    />
  );
};

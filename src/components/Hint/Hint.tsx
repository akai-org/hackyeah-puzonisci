import { FC, ReactNode } from 'react';
import { MdOutlineCompost } from 'react-icons/md';
import { Flex, Text } from '@chakra-ui/react';

interface HintProps {
  icon: ReactNode;
  text: string;
  mt?: string;
}

export const Hint: FC<HintProps> = ({ text, icon, mt }) => {
  return (
    <Flex bgColor="#d07957" p="10px 20px" mt={mt} borderRadius="10px">
      {icon}
      <Text fontSize="24px" ml="20px" textAlign="left" fontWeight="bold">
        {text}
      </Text>
    </Flex>
  );
};

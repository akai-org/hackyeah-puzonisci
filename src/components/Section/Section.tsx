import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import s from './Section.module.scss';

export interface SectionProps {
  content: string;
  isEven: boolean;
  title?: string;
}

export const Section: FC<SectionProps> = ({ title, content, isEven }) => {
  return (
    <Flex
      textAlign="center"
      direction="column"
      py="30px"
      bgColor={isEven ? 'lightGray' : 'white'}
    >
      <Text className={s.accent} fontSize="35px" mx="auto" fontWeight="bold">
        {title}
      </Text>
      <Text mt="10px" fontSize="16px">
        {content}
      </Text>
    </Flex>
  );
};

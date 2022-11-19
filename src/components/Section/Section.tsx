import { Flex, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import s from './Section.module.scss';
import { useIsMobile } from '../../hooks';

export interface SectionProps {
  content: ReactNode;
  isEven: boolean;
  title?: string;
}

export const Section: FC<SectionProps> = ({ title, content, isEven }) => {
  const isMobile = useIsMobile();

  return (
    <Flex
      textAlign="center"
      direction="column"
      py="30px"
      bgColor={isEven ? 'lightGray' : 'white'}
      px={isMobile ? '20px' : '300px'}
    >
      <Text
        className={s.accent}
        mb="20px"
        fontSize="35px"
        mx="auto"
        fontWeight="bold"
      >
        {title}
      </Text>
      {typeof content === 'string' ? (
        <Text fontSize="16px">{content}</Text>
      ) : (
        content
      )}
    </Flex>
  );
};

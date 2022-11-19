import { Section, SectionProps } from '../../components';
import { Box } from '@chakra-ui/react';

//TODO: Robert fill the sections with real content
const contentSections: Array<SectionProps> = [
  { title: 'Title 1', content: 'Content 1', isEven: true },
  { title: 'Title 2', content: 'Content 2', isEven: false },
];

export const InfoPage = () => {
  return (
    <Box>
      {contentSections.map((item) => (
        <Section
          title={item.title}
          content={item.content}
          isEven={item.isEven}
        />
      ))}
    </Box>
  );
};

import { Section, SectionProps } from '../../components';
import { Box } from '@chakra-ui/react';

//TODO: Robert fill the sections with real content
const contentSections: Array<SectionProps> = [
  {
    title: 'What is Composting?  ',
    content: (
      <>
        {' '}
        is the processing of organic matter into compost in the course of
        natural biochemical processes with the participation of microorganisms.
        its becoming a noticeable trend in Poland, as it is a grat way to
        produce compost - a valuable material for fertilizing the soil, as well
        as a method for managing organic waste (bio), generated each day at our
        homes and gardens.
      </>
    ),
    isEven: true,
  },
  {
    title: 'Why is composting so important?',
    content: (
      <>
        Composting waste allows us to protect the environment, because:
        <ul>
          <li>
            we reduce the amount of generated waste and the cost of their
            transport and management in installations – the active
            implementation of the ‘zero waste’ principle,
          </li>
          <li>
            we reduce the amount of methane generated in landfills due to the
            decomposing waste, which causes global warming when getting into the
            atmosphere,
          </li>
          <li>
            it allows us to obtain a natural and free fertilizer which is safe
            for humans and the environment – using it makes garden plants grow
            better, to increase the harvest of vegetables; moreover, compost
            limits the development of weeds and helps the soil to maintain
            moisture, thus helping to sustain the periods of drought which occur
            increasingly more often.
          </li>
        </ul>
      </>
    ),
    isEven: false,
  },
  {
    title: 'Is composting hard?',
    content: (
      <>
        Independent generation of compost is easy and it does not require
        specialist knowledge, while setting up a composter is possible not only
        in a garden, but it can also be done at home or on the balcony. A
        composter can be built independently or we can purchase a ready
        construction. When creating a home composter, we must pay attention to
        what we put inside to make sure that the final product is usable. It
        must be stressed however that a properly maintained composter does not
        generate any odour.
      </>
    ),
    isEven: true,
  },
  {
    title: 'What can be composted?',
    content: (
      <>
        <ul>
          <li>
            kitchen waste, for instance peelings, leftover vegetables and fruit,
            eggshells, coffee/tea grounds, stale bread,
          </li>
          <li>leaves, sprouts, plant stems, </li>
          <li>cut grass,</li>
          <li>tree bark and fine branches, hay, </li>
          <li>withered flowers and pot plants, </li>
          <li>
            unprinted and soft paper/cardboard (i.e. paper for wrapping food,
            tissues, paper towels)
          </li>
        </ul>
      </>
    ),
    isEven: false,
  },
  {
    title: 'What should not be placed in a composter:',
    content: (
      <>
        <ul>
          <li>
            materials such as ceramics, plastics, metals, glass or fabric – they
            are not composted
          </li>
          <li>
            organic matter which may contain chemicals, such as printed paper or
            newspapers, empty cardboard beverage packagings, painted and
            impregnated wood,
          </li>
          <li>
            kitchen waste such as meat, bones, fat, dairy or whole eggs which
            generate unpleasant odour when decomposing,
          </li>
          <li>animal faeces, cat litter (for sanitary reasons),</li>
          <li>spoiled food,</li>
          <li>soil, gravel, stones,</li>
          <li>
            parts of diseased plants or plants attacked by parasites (mushroom
            spores or parasitic eggs can survive the composting process and be
            reintroduced to the soil)
          </li>
          <li>
            weeds which have created seds (the seeds are going to survive in the
            compost and sprout in soil covered in compost)
          </li>
          <li>
            thick branches and pine needles – they decompose for a long time,
            extending the time needed for generating compost,
          </li>
          <li>
            plant-based waste which may be contaminated, such as weed with plant
            protection products or peelings from citrus fruits which contain
            preservatives.
          </li>
        </ul>
      </>
    ),
    isEven: true,
  },
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

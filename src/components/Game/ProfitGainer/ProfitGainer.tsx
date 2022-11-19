import { GainUpgrade } from '../../../types/gameTypes';
import { Dispatch, FC, SetStateAction } from 'react';
import { Avatar, Card, Progress, Stack } from '@chakra-ui/react';
import styles from './ProfitGainer.module.scss';

interface Props {
  img: string;
  upgrades: GainUpgrade[];
  updateVertilizer: Dispatch<SetStateAction<number>>;
  isAutoClicking?: boolean;
}

export const ProfitGainer: FC<Props> = ({
  isAutoClicking = false,
  img,
  updateVertilizer,
  upgrades,
}) => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      className={styles.card}
    >
      <Avatar size="lg" objectFit="cover" src={img} />
      <Stack className={styles.stack}>
        <Progress colorScheme="green" height="32px" value={20} />
        <Progress colorScheme="blue" height="32px" value={20} />
      </Stack>
    </Card>
  );
};

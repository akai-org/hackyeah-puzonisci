import { GainUpgrade, ProfitGainerVals } from '../../../types/gameTypes';
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Avatar, Card, Progress, Stack } from '@chakra-ui/react';
import styles from './ProfitGainer.module.scss';

interface Props {
  img: string;
  upgrades: GainUpgrade[];
  updateVertilizer: Dispatch<SetStateAction<number>>;
  isAutoClicking?: boolean;
  internalVals: ProfitGainerVals;
}

export const ProfitGainer: FC<Props> = ({
  isAutoClicking = false,
  img,
  updateVertilizer,
  upgrades,
  internalVals,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [internalVertilizer, setInternalVertilizer] = useState(0);
  const speed = internalVals.requiredAmount / internalVals.time;
  const [inter, setInter] = useState<number | undefined>();

  const vertilizerRef = useRef(internalVertilizer);
  const intervalRef = useRef(inter);

  useEffect(() => {
    vertilizerRef.current = internalVertilizer;
    intervalRef.current = inter;
  });

  const progress = () => {
    if (isClicked) return;

    setIsClicked(true);
    const interTmp = setInterval(() => {
      console.log('time');
      setInternalVertilizer((vertilizer) => vertilizerRef.current + speed);
      if (vertilizerRef.current >= internalVals.requiredAmount) {
        updateVertilizer((vertilizer) => vertilizer + vertilizerRef.current);
        setInternalVertilizer(0);
        console.log('goal reached');
        if (intervalRef.current) {
          console.log('cleared');
          clearInterval(intervalRef.current);
          setIsClicked(false);
          setInter(undefined);
          intervalRef.current = undefined;
        }
      }
    }, 1);

    setInter(interTmp);
  };
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      className={styles.card}
      onClick={progress}
    >
      <Avatar size="lg" objectFit="cover" src={img} />
      <Stack className={styles.stack}>
        <Progress
          colorScheme="green"
          height="32px"
          value={internalVertilizer / internalVals.requiredAmount}
        />
        <Progress colorScheme="blue" height="32px" value={20} />
      </Stack>
    </Card>
  );
};

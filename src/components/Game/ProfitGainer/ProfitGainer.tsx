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
      setInternalVertilizer((vertilizer) => vertilizerRef.current + speed);
      if (vertilizerRef.current >= internalVals.requiredAmount) {
        updateVertilizer((vertilizer) => vertilizerRef.current + vertilizer);
        setInternalVertilizer(0);
        clearInterval(intervalRef.current);
        setIsClicked(false);
      }
    }, 10);

    setInter(interTmp);
  };
  console.log((vertilizerRef.current / internalVals.requiredAmount) * 100);
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
          value={(internalVertilizer / internalVals.requiredAmount) * 100}
        />
        <Progress colorScheme="blue" height="32px" value={20} />
      </Stack>
    </Card>
  );
};

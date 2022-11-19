import { ProfitGainerVals } from '../../../types/gameTypes';
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from 'react';
import { Avatar, Button, Card, Progress, Stack } from '@chakra-ui/react';
import styles from './ProfitGainer.module.scss';

interface Props {
  img: string;
  basicUpgradeCost: number;
  updateVertilizer: Dispatch<SetStateAction<number>>;
  internalVals: ProfitGainerVals;
  updateMoney: Dispatch<SetStateAction<number>>;
  money: number;
  autoClickCost: number;
}

export const ProfitGainer: FC<Props> = ({
  img,
  updateVertilizer,
  basicUpgradeCost,
  internalVals,
  updateMoney,
  money,
  autoClickCost,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [internalVertilizer, setInternalVertilizer] = useState(0);
  const [inter, setInter] = useState<number | undefined>();
  const [upgradeCost, setUpgradeCost] = useState(basicUpgradeCost);
  const [multiplier, setMultiplier] = useState(1);
  const [autoClick, setAutoClick] = useState(false);
  const speed = (internalVals.requiredAmount / internalVals.time) * multiplier;
  const autoClickRef = useRef(autoClick);

  const vertilizerRef = useRef(internalVertilizer);
  const intervalRef = useRef(inter);

  useEffect(() => {
    vertilizerRef.current = internalVertilizer;
    intervalRef.current = inter;
    autoClickRef.current = autoClick;
  });

  const progress = () => {
    if (isClicked) return;

    setIsClicked(true);
    const interTmp = setInterval(() => {
      setInternalVertilizer(vertilizerRef.current + speed);
      if (vertilizerRef.current >= internalVals.requiredAmount) {
        updateVertilizer((vertilizer) => {
          if (vertilizerRef.current > internalVals.requiredAmount) {
            return vertilizer + internalVals.requiredAmount;
          }
          return vertilizerRef.current + vertilizer;
        });
        setInternalVertilizer(0);
        clearInterval(intervalRef.current);
        setIsClicked(false);
        if (autoClickRef.current) {
          progress();
        }
      }
    }, 10);

    setInter(interTmp);
  };

  const turnOnAutoClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (money < autoClickCost) return;
    updateMoney(money - autoClickCost);
    setAutoClick(true);
    progress();
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
          // * 100%
          value={(internalVertilizer / internalVals.requiredAmount) * 100}
        />
        <Button
          onClick={(e) => {
            e.stopPropagation();
            updateMoney((money) => money - upgradeCost);
            setUpgradeCost((cost) => cost * 8);
            setMultiplier((multiplier) => multiplier * 2);
          }}
          disabled={money < upgradeCost || isClicked}
        >
          Upgrade {upgradeCost}zł
        </Button>
      </Stack>
      <Button
        disabled={autoClick || money < autoClickCost}
        onClick={(e) => turnOnAutoClick(e)}
      >
        Upgrade ({autoClickCost}zł)
      </Button>
    </Card>
  );
};

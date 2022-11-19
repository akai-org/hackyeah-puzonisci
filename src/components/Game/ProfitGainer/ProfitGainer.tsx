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
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Progress,
  Stack,
} from '@chakra-ui/react';
import styles from './ProfitGainer.module.scss';

export interface ProfitGainerProps {
  img: string;
  basicUpgradeCost: number;
  updateVertilizer: Dispatch<SetStateAction<number>>;
  internalVals: ProfitGainerVals;
  updateMoney: Dispatch<SetStateAction<number>>;
  money: number;
  autoClickCost: number;
  cost: number;
  isBought?: boolean;
}

export const ProfitGainer: FC<ProfitGainerProps> = ({
  img,
  updateVertilizer,
  basicUpgradeCost,
  internalVals,
  updateMoney,
  money,
  autoClickCost,
  cost,
  isBought = false,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [internalVertilizer, setInternalVertilizer] = useState(0);
  const [inter, setInter] = useState<number | undefined>();
  const [upgradeCost, setUpgradeCost] = useState(basicUpgradeCost);
  const [autoClick, setAutoClick] = useState(false);
  const [speed, setSpeed] = useState(
    internalVals.requiredAmount / internalVals.time,
  );
  const autoClickRef = useRef(autoClick);
  const speedRef = useRef(speed);
  const [isBoughtState, setIsBoughtState] = useState(isBought);

  const vertilizerRef = useRef(internalVertilizer);
  const intervalRef = useRef(inter);

  useEffect(() => {
    vertilizerRef.current = internalVertilizer;
    intervalRef.current = inter;
    autoClickRef.current = autoClick;
    speedRef.current = speed;
  });

  const progress = () => {
    if (isClicked) return;

    setIsClicked(true);
    const interTmp = setInterval(() => {
      setInternalVertilizer(vertilizerRef.current + speedRef.current);
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
    }, 1);

    setInter(interTmp);
  };

  const turnOnAutoClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (money < autoClickCost) return;
    updateMoney(money - autoClickCost);
    setAutoClick(true);
    progress();
  };

  return isBoughtState ? (
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
            setSpeed((speed) => speed * 2);
          }}
          disabled={money < upgradeCost || (isClicked && !autoClick)}
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
  ) : money >= cost ? (
    <Card>
      <CardBody
        onClick={() => {
          setIsBoughtState(true);
          updateMoney((money) => money - cost);
        }}
      >
        Buy for {cost}zł
      </CardBody>
    </Card>
  ) : null;
};

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
import { Button, Card, Progress, Stack, Text } from '@chakra-ui/react';
import styles from './ProfitGainer.module.scss';

export interface ProfitGainerProps {
  // eslint-disable-next-line no-undef
  icon: JSX.Element;
  basicUpgradeCost: number;
  updateVertilizer: Dispatch<SetStateAction<number>>;
  internalVals: ProfitGainerVals;
  updateMoney: Dispatch<SetStateAction<number>>;
  money: number;
  autoClickCost: number;
  cost: number;
  isBought?: boolean;
  name: string;
}

export const ProfitGainer: FC<ProfitGainerProps> = ({
  icon,
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
  const [amount, setAmount] = useState(1);
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
    <Stack onClick={progress} direction="row" alignItems="center">
      <Stack className={styles.iconAmountStack}>
        <Card className={styles.iconCard}>{icon}</Card>
        <Text fontSize={25} align="center">
          x{amount}
        </Text>
      </Stack>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="unstyled"
        className={styles.card}
      >
        <Stack>
          <Progress
            height="32px"
            // * 100%
            value={(internalVertilizer / internalVals.requiredAmount) * 100}
          />
          <Stack direction="row">
            <Button
              className={styles.profitButton}
              colorScheme="blue"
              onClick={(e) => {
                e.stopPropagation();
                updateMoney((money) => money - upgradeCost);
                setUpgradeCost((cost) => cost * 5);
                setSpeed((speed) => speed * 1.4);
                setAmount((amount) => amount + 1);
              }}
              disabled={money < upgradeCost}
            >
              Upgrade {upgradeCost}zł
            </Button>
            <Button
              className={styles.profitButton}
              colorScheme="purple"
              disabled={autoClick || money < autoClickCost}
              onClick={(e) => turnOnAutoClick(e)}
            >
              auto ({autoClickCost}zł)
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  ) : money >= cost ? (
    <div className={styles.someWrapper}>
      <Text className={styles.centeredText}>Kup za {cost}zł</Text>
      <Stack
        className={styles.toBuyCard}
        onClick={() => {
          setIsBoughtState(true);
          updateMoney((money) => money - cost);
        }}
        direction="row"
        alignItems="center"
      >
        <Stack className={styles.iconAmountStack}>
          <Card className={styles.iconCard}>{icon}</Card>
          <Text fontSize={25} align="center">
            x{amount}
          </Text>
        </Stack>
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          variant="unstyled"
          className={styles.card}
        >
          <Stack>
            <Progress
              height="32px"
              // * 100%
              value={(internalVertilizer / internalVals.requiredAmount) * 100}
            />
            <Stack style={{ pointerEvents: 'none' }} direction="row">
              <Button
                className={styles.profitButton}
                colorScheme="blue"
                onClick={(e) => {}}
                disabled
              >
                Upgrade {upgradeCost}zł
              </Button>
              <Button
                className={styles.profitButton}
                colorScheme="purple"
                disabled
                onClick={(e) => {}}
              >
                Upgrade ({autoClickCost}zł)
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </div>
  ) : (
    <Stack
      className={styles.lockedCard}
      onClick={() => {}}
      direction="row"
      alignItems="center"
    >
      <Stack className={styles.iconAmountStack}>
        <Card className={styles.iconCard}>{icon}</Card>
        <Text fontSize={25} align="center">
          x{amount}
        </Text>
      </Stack>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="unstyled"
        className={styles.card}
      >
        <Stack>
          <Progress
            height="32px"
            // * 100%
            value={(internalVertilizer / internalVals.requiredAmount) * 100}
          />
          <Stack direction="row">
            <Button
              className={styles.profitButton}
              colorScheme="blue"
              onClick={(e) => {}}
              disabled
            >
              Upgrade {upgradeCost}zł
            </Button>
            <Button
              className={styles.profitButton}
              colorScheme="purple"
              disabled
              onClick={(e) => {}}
            >
              Upgrade ({autoClickCost}zł)
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

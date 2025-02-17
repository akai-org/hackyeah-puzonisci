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
import { Button, Card, Progress, Stack, Text, Tooltip } from '@chakra-ui/react';
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
  name,
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
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  const vertilizerRef = useRef(internalVertilizer);
  const intervalRef = useRef(inter);

  useEffect(() => {
    vertilizerRef.current = internalVertilizer;
    intervalRef.current = inter;
    autoClickRef.current = autoClick;
    speedRef.current = speed;
  });

  const progress = () => {
    setIsTooltipOpen(false);
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
    <div className={styles.someWrapper} onClick={progress}>
      {cost === 0 && isTooltipOpen ? (
        <Text
          style={{ cursor: 'pointer', textAlign: 'center' }}
          className={styles.centeredText}
        >
          Kliknij mnie!
        </Text>
      ) : null}
      <Stack
        direction="row"
        alignItems="center"
        className={[styles.rel, isTooltipOpen ? styles.blur : ''].join(' ')}
      >
        <Stack className={styles.iconAmountStack}>
          <Card className={styles.iconCard}>
            <Tooltip label={name}>
              <span>{icon}</span>
            </Tooltip>
          </Card>
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
              cursor="pointer"
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
                minWidth="200px"
                disabled={money < upgradeCost}
              >
                Upgrade {upgradeCost}zł
              </Button>
              <Button
                className={styles.profitButton}
                colorScheme="purple"
                disabled={autoClick || money < autoClickCost}
                onClick={(e) => turnOnAutoClick(e)}
                minWidth="200px"
              >
                auto ({autoClickCost}zł)
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </div>
  ) : money >= cost ? (
    <div
      className={styles.someWrapper}
      onClick={() => {
        setIsBoughtState(true);
        updateMoney((money) => money - cost);
      }}
    >
      <Text className={styles.centeredText}>Kup za {cost}zł</Text>
      <Stack className={styles.toBuyCard} direction="row" alignItems="center">
        <Stack className={styles.iconAmountStack}>
          <Card className={styles.iconCard}>
            <Tooltip label={name}>
              <span>{icon}</span>
            </Tooltip>
          </Card>
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
              cursor="pointer"
              height="32px"
              // * 100%
              value={(internalVertilizer / internalVals.requiredAmount) * 100}
            />
            <Stack style={{ pointerEvents: 'none' }} direction="row">
              <Button
                style={{ pointerEvents: 'none' }}
                className={styles.profitButton}
                colorScheme="blue"
                onClick={(e) => {}}
                disabled
                minWidth="200px"
              >
                Upgrade {upgradeCost}zł
              </Button>
              <Button
                style={{ pointerEvents: 'none' }}
                className={styles.profitButton}
                colorScheme="purple"
                disabled
                onClick={(e) => {}}
                minWidth="200px"
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
        <Card className={styles.iconCard}>
          <Tooltip label={name}>
            <span>{icon}</span>
          </Tooltip>
        </Card>
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
            cursor="pointer"
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
              minWidth="200px"
            >
              Upgrade {upgradeCost}zł
            </Button>
            <Button
              className={styles.profitButton}
              colorScheme="purple"
              disabled
              onClick={(e) => {}}
              minWidth="200px"
            >
              Upgrade ({autoClickCost}zł)
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

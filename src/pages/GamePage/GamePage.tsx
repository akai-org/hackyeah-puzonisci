import { Button, Card, CardBody, SimpleGrid, Text } from '@chakra-ui/react';
import styles from './GamePage.module.scss';
import { useState } from 'react';
import {
  ProfitGainer,
  ProfitGainerProps,
} from '../../components/Game/ProfitGainer/ProfitGainer';
import bezi from '../../../public/bezi.jpg';
import kiepski from '../../../public/kiepski.webp';

const moneyPerVertilizer = 1;

export const GamePage = () => {
  const [vertilizer, setVertilizer] = useState(1000);
  const [money, setMoney] = useState(0);

  const gainers: ProfitGainerProps[] = [
    {
      img: bezi,
      autoClickCost: 200000,
      money,
      internalVals: { time: 1000, requiredAmount: 20000 },
      updateMoney: setMoney,
      basicUpgradeCost: 400,
      updateVertilizer: setVertilizer,
      cost: 0,
      isBought: true,
    },
    {
      img: kiepski,
      autoClickCost: 200000,
      money,
      internalVals: { time: 1000, requiredAmount: 500 },
      updateMoney: setMoney,
      basicUpgradeCost: 400,
      updateVertilizer: setVertilizer,
      cost: 10000,
    },
  ];

  const transferVertilizer = () => {
    setMoney((money) => money + vertilizer * moneyPerVertilizer);
    setVertilizer(0);
  };

  return (
    <main className={styles.gameWrapper}>
      <Card className={styles.mainGameCard}>
        <CardBody className={styles.cardBody}>
          <section className={styles.headerModule}>
            <Text noOfLines={1} className={styles.moneyDisplay}>
              {vertilizer}kg
            </Text>
            <Button
              onClick={transferVertilizer}
              className={styles.transferVertilizer}
              colorScheme="green"
            >
              Transfer to money
            </Button>
            <Text className={styles.moneyDisplay}>{money}zł</Text>
          </section>
          <SimpleGrid columns={2} spacing={3} className={styles.profitGainers}>
            {gainers.map((gainer) => (
              <ProfitGainer {...gainer} key={gainer.img} />
            ))}
          </SimpleGrid>
        </CardBody>
      </Card>
    </main>
  );
};

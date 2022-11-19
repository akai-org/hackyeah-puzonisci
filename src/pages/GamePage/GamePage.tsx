import {
  Box,
  Button,
  Card,
  CardBody,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import styles from './GamePage.module.scss';
import { useState } from 'react';
import { ProfitGainer } from '../../components/Game/ProfitGainer/ProfitGainer';
import bezi from '../../../public/bezi.jpg';

const moneyPerVertilizer = 1;

export const GamePage = () => {
  const [vertilizer, setVertilizer] = useState(1000);
  const [money, setMoney] = useState(0);

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
            <ProfitGainer
              img={bezi}
              money={money}
              updateMoney={setMoney}
              basicUpgradeCost={100}
              updateVertilizer={setVertilizer}
              internalVals={{ requiredAmount: 5000, time: 200 }}
              autoClickCost={100}
            />
            <Box bg="tomato" height="80px"></Box>
            <Box bg="tomato" height="80px"></Box>
            <Box bg="tomato" height="80px"></Box>
            <Box bg="tomato" height="80px"></Box>
          </SimpleGrid>
        </CardBody>
      </Card>
    </main>
  );
};

import { Button, Card, CardBody, Text } from '@chakra-ui/react';
import styles from './GamePage.module.scss';
import { useState } from 'react';

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
        </CardBody>
      </Card>
    </main>
  );
};

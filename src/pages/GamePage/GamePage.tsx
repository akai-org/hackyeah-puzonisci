import { Card, CardBody, Text } from '@chakra-ui/react';
import styles from './GamePage.module.scss';

export const GamePage = () => {
  return (
    <main className={styles.gameWrapper}>
      <Card className={styles.mainGameCard}>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
      </Card>
    </main>
  );
};

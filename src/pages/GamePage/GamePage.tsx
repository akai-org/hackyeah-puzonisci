import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react';
import styles from './GamePage.module.scss';
import { useState } from 'react';
import {
  ProfitGainer,
  ProfitGainerProps,
} from '../../components/Game/ProfitGainer/ProfitGainer';
import bezi from '../../../public/bezi.jpg';
import kiepski from '../../../public/kiepski.webp';
import kaczynski from '../../../public/kaczynski.jpg';
import full from '../../../public/full.jpeg';
import { CompostableQuizQuestion } from '../../types/gameTypes';
import pawel from '../../../public/pawel.webp';

const moneyPerVertilizer = 1;

const questons: CompostableQuizQuestion[] = [
  { isCompostable: true, itemName: 'Kaczyński', itemImage: kaczynski },
  { isCompostable: false, itemName: 'mocny full', itemImage: full },
  { isCompostable: true, itemName: 'Pan Paweł', itemImage: pawel },
];

export const GamePage = () => {
  const [vertilizer, setVertilizer] = useState(1000);
  const [money, setMoney] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);

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
    <>
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
            <SimpleGrid
              columns={2}
              spacing={3}
              className={styles.profitGainers}
            >
              {gainers.map((gainer) => (
                <ProfitGainer {...gainer} key={gainer.img} />
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>
      </main>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalOverlay
          onClick={() => {
            console.log('High! Voltage! Rock n roll!');
          }}
        />
        <ModalContent>
          <ModalHeader>Czy ten przedmiot jest kompostowalny?</ModalHeader>
          <ModalBody>
            <Stack>
              <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
              <Text></Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

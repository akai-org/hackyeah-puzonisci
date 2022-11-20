import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import styles from './GamePage.module.scss';
import { useState } from 'react';
import {
  ProfitGainer,
  ProfitGainerProps,
} from '../../components/Game/ProfitGainer/ProfitGainer';
import { CompostableQuizQuestion } from '../../types/gameTypes';
import { shuffle } from 'lodash';
import {
  GiCarrot,
  GiLightningBranches,
  GiSausage,
  IoBeerSharp,
  IoEggOutline,
  IoLeafSharp,
  RiFilePaper2Line,
  SiGitea,
} from 'react-icons/all';

const moneyPerVertilizer = 0.4;
const quizPoints = 5000;

const questions: CompostableQuizQuestion[] = [
  {
    isCompostable: true,
    itemName: 'marchewka',
    itemIcon: <GiCarrot fontSize={50} />,
  },
  {
    isCompostable: false,
    itemName: 'piwo',
    itemIcon: <IoBeerSharp fontSize={50} />,
  },
  {
    isCompostable: false,
    itemName: 'kiełbasa',
    itemIcon: <GiSausage fontSize={50} />,
  },
];

export const GamePage = () => {
  const [vertilizer, setVertilizer] = useState(0);
  const [money, setMoney] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<
    CompostableQuizQuestion[]
  >(shuffle(questions));
  const [index, setIndex] = useState(0);

  const setNextIndex = () => {
    setIndex((index) => {
      if (index + 1 === shuffledQuestions.length) {
        setShuffledQuestions(shuffle(questions));
        return 0;
      }
      return index + 1;
    });
  };

  const gainers: ProfitGainerProps[] = [
    {
      name: 'leaf',
      icon: <IoLeafSharp />,
      autoClickCost: 500,
      money,
      internalVals: { time: 100, requiredAmount: 5 },
      updateMoney: setMoney,
      basicUpgradeCost: 10,
      updateVertilizer: setVertilizer,
      cost: 0,
      isBought: true,
      isModalOpen,
      setIsModalOpen,
    },
    {
      name: 'branch',
      icon: <GiLightningBranches />,
      autoClickCost: 200000,
      money,
      internalVals: { time: 1000, requiredAmount: 800 },
      updateMoney: setMoney,
      basicUpgradeCost: 20,
      updateVertilizer: setVertilizer,
      cost: 900,
      isModalOpen,
      setIsModalOpen,
    },
    {
      name: 'tea',
      icon: <SiGitea />,
      autoClickCost: 200000,
      money,
      internalVals: { time: 1000, requiredAmount: 500 },
      updateMoney: setMoney,
      basicUpgradeCost: 400,
      updateVertilizer: setVertilizer,
      cost: 10000,
      isModalOpen,
      setIsModalOpen,
    },
    {
      name: 'carrot',
      icon: <GiCarrot />,
      autoClickCost: 200000,
      money,
      internalVals: { time: 1000, requiredAmount: 500 },
      updateMoney: setMoney,
      basicUpgradeCost: 400,
      updateVertilizer: setVertilizer,
      cost: 10000,
      isModalOpen,
      setIsModalOpen,
    },
    {
      name: 'paper',
      icon: <RiFilePaper2Line />,
      autoClickCost: 200000,
      money,
      internalVals: { time: 1000, requiredAmount: 500 },
      updateMoney: setMoney,
      basicUpgradeCost: 400,
      updateVertilizer: setVertilizer,
      cost: 10000,
      isModalOpen,
      setIsModalOpen,
    },
    {
      name: 'egg',
      icon: <IoEggOutline />,
      autoClickCost: 200000,
      money,
      internalVals: { time: 1000, requiredAmount: 500 },
      updateMoney: setMoney,
      basicUpgradeCost: 400,
      updateVertilizer: setVertilizer,
      cost: 10000,
      isModalOpen,
      setIsModalOpen,
    },
  ];

  const transferVertilizer = () => {
    setMoney((money) => money + vertilizer * moneyPerVertilizer);
    setVertilizer(0);
  };

  const handleQuizAnswer = (userChoice: boolean) => {
    if (userChoice === shuffledQuestions[index].isCompostable) {
      setVertilizer((vertilizer) => vertilizer + quizPoints);
    } else {
      setVertilizer((vertilizer) => {
        if (vertilizer - quizPoints < 0) {
          return 0;
        }
        return vertilizer - quizPoints;
      });
    }
    setNextIndex();
    setIsModalOpen(false);
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
                <ProfitGainer {...gainer} key={gainer.name} />
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
            <Stack alignItems="center">
              {shuffledQuestions[index].itemIcon}
              <Text className={styles.modalText}>
                {shuffledQuestions[index].itemName}
              </Text>
            </Stack>
            <Stack direction="row" justifyContent="center" spacing={4}>
              <Button onClick={() => handleQuizAnswer(true)}>Tak</Button>
              <Button onClick={() => handleQuizAnswer(false)}>Nie</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

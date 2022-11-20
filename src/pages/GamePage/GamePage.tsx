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
import { useEffect, useRef, useState } from 'react';
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

const moneyPerVertilizer = 0.8;
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
  const [interval, setInterval] = useState(Math.random() * 100000);
  const intervalRef = useRef(interval);

  useEffect(() => {
    intervalRef.current = interval;
  });

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
      autoClickCost: 200,
      money,
      internalVals: { time: 100, requiredAmount: 50 },
      updateMoney: setMoney,
      basicUpgradeCost: 10,
      updateVertilizer: setVertilizer,
      cost: 0,
      isBought: true,
    },
    {
      name: 'branch',
      icon: <GiLightningBranches />,
      autoClickCost: 500,
      money,
      internalVals: { time: 300, requiredAmount: 250 },
      updateMoney: setMoney,
      basicUpgradeCost: 20,
      updateVertilizer: setVertilizer,
      cost: 150,
    },
    {
      name: 'tea',
      icon: <SiGitea />,
      autoClickCost: 1500,
      money,
      internalVals: { time: 500, requiredAmount: 1000 },
      updateMoney: setMoney,
      basicUpgradeCost: 100,
      updateVertilizer: setVertilizer,
      cost: 500,
    },
    {
      name: 'carrot',
      icon: <GiCarrot />,
      autoClickCost: 5000,
      money,
      internalVals: { time: 1000, requiredAmount: 5000 },
      updateMoney: setMoney,
      basicUpgradeCost: 500,
      updateVertilizer: setVertilizer,
      cost: 2500,
    },
    {
      name: 'paper',
      icon: <RiFilePaper2Line />,
      autoClickCost: 10000,
      money,
      internalVals: { time: 1000, requiredAmount: 10000 },
      updateMoney: setMoney,
      basicUpgradeCost: 1000,
      updateVertilizer: setVertilizer,
      cost: 5000,
    },
    {
      name: 'egg',
      icon: <IoEggOutline />,
      autoClickCost: 15000,
      money,
      internalVals: { time: 1000, requiredAmount: 50000 },
      updateMoney: setMoney,
      basicUpgradeCost: 2000,
      updateVertilizer: setVertilizer,
      cost: 25000,
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

  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(true);
      setInterval(Math.random() * 100000);
    }, intervalRef.current);
  }, [interval]);

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
                id="twoja-stara"
                color="white"
              >
                Sprzedaj kompost
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

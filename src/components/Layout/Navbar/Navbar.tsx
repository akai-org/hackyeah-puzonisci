import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Link,
  IconButton,
  Stack,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '../../../hooks';

const Links = [
  { name: 'Informacje', urlPart: 'info', isMobile: true },
  { name: 'Sprawdź się', urlPart: 'counter', isMobile: true },
  { name: 'Gra', urlPart: 'game', isMobile: false },
];

const NavLink = ({ children, to }: { children: ReactNode; to: string }) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      lineHeight="30px"
      height="40px"
      my="15px"
      _hover={{
        textDecoration: 'none',
        bg: '#f6af90',
      }}
      bgColor={location.pathname.includes(to) && !isMobile ? '#f6af90' : 'none'}
      mr="5px"
      href={to}
    >
      {children}
    </Link>
  );
};

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useIsMobile();

  return (
    <>
      <Box bg="white" px={4} py="10px">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Flex justifyContent="space-between" width="100%">
            <Flex
              width={isMobile ? '100%' : 'auto'}
              lineHeight="32px"
              justifyContent="center"
            >
              <Image
                mt="2px"
                height="65px"
                width="65px"
                lineHeight="50px"
                src="../../../../public/logo.svg"
                alt={'dupa'}
              />
              <Text
                fontSize={isMobile ? '30px' : '40px'}
                ml="10px"
                lineHeight="60px"
                fontWeight="bold"
              >
                Kompostujemy
              </Text>
            </Flex>
            {!isMobile && (
              <Flex>
                {Links.map((link) => (
                  <NavLink key={link.name} to={link.urlPart}>
                    <Box width="100px" textAlign="center">
                      {link.name}
                    </Box>
                  </NavLink>
                ))}
              </Flex>
            )}
          </Flex>
          <Box width="30px"></Box>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) =>
                link.isMobile ? (
                  <NavLink key={link.name} to={link.urlPart}>
                    {link.name}
                  </NavLink>
                ) : (
                  ''
                ),
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

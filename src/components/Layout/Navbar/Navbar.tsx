import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';
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
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      bgColor={
        location.pathname.includes(to) && !isMobile
          ? useColorModeValue('gray.200', 'gray.700')
          : 'none'
      }
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
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
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
              Logo
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

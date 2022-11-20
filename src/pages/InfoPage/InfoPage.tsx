import { Hint, Section, SectionProps } from '../../components';
import { Box } from '@chakra-ui/react';
import {
  AiOutlineBug,
  BiBlanket,
  BiBone,
  SiGitea,
  BsTree,
  BsTruck,
  FaDog,
  FaSeedling,
  GiStonePile,
  IoMdPaper,
  MdGrass,
  SlChemistry,
  TbChartBubble,
  TbPlant,
  TbToolsKitchen,
  TbToolsKitchen2,
} from 'react-icons/all';

//TODO: Robert fill the sections with real content
const contentSections: Array<SectionProps> = [
  {
    title: 'Na czym polega kompostowanie?',
    content:
      'Kompostowanie to organiczny, najprostszy recykling. Bardzo pomocny w gospodarowaniu odpadami. Biomateriał wytworzony przez forę i faunę „powraca” jako cenny kompost. W naturze nic nie ginie. Najwięcej odpadów kompostuje się w Portugalii i Hiszpanii – ok. 17%., w Danii ok. 9% i Francji ok. 8%. W krajach tych wytwarzane komposty znajdują szerokie  zastosowanie w produkcji winorośli, ogrodnictwie, warzywnictwie, produkcji rolnej i szkółkarskiej. Również duże ilości kompostów w kompostowniach przydomowych produkują rolnicy indywidualni w Austrii, wykorzystują go do celów nawozowych.',
    isEven: true,
  },
  {
    title: 'Dlaczego robienie kompostu jest takie ważne?',
    content: (
      <>
        <Hint
          icon={<BsTruck size={70} />}
          mb="20px"
          text="Redukujemy ilość generowanych odpadów oraz koszty ich transportu a
            także zagospodarowania ich - aktywne wdrażanie zasady “zero waste”"
        />
        <Hint
          mb="20px"
          icon={<TbChartBubble size={70} />}
          text="Zmniejszamy ilość metanu powstającego na składowiskach w wyniku
            rozkładających się odpadów, który przyczynia się do globalnego
            ocieplenia uciekają do atmosfery"
        />
        <Hint
          mb="10px"
          icon={<TbPlant size={70} />}
          text="Pozwala nam to na uzyskanie naturalnego i darmowego nawozu, który
            jest bezpieczny dla ludzi i środowiska a także korzystanie z niego
            sprawia, że rośliny ogrodowe lepiej rosną."
        />
      </>
    ),
    isEven: false,
  },
  {
    title: 'Czy robienie kompostu jest trudne?',
    content:
      'Wytwarzanie kompostu jest łatwe i nie wymaga specjalistycznej wiedzy, a założenie kompostownika możliwe jest nie tylko w ogrodzie, ale również w domu czy na balkonie. Kompostownik można zbudować samodzielnie lub zakupić gotową konstrukcję. Tworząc domowy kompostownik musimy zwrócić uwagę na to, co wkładamy do środka, aby finalny produkt nadawał się do użytku. Należy jednak podkreślić, że prawidłowo konserwowany kompostownik nie wydziela żadnego zapachu',
    isEven: true,
  },
  {
    title: 'Codzienne odpady nadające się do kompostowania:',
    content: (
      <>
        <Hint
          icon={<MdGrass size={70} />}
          mb="20px"
          text="Skoszona trawa, liście oraz zwiędłe rośliny"
        />
        <Hint
          icon={<TbToolsKitchen2 size={60} />}
          mb="20px"
          text="Odpadki kuchenne pokroju obierek, pozostałości owoców i warzyw,
            skorupek jajek czy czerstwe pieczywo”"
        />
        <Hint
          icon={<SiGitea size={60} />}
          mb="20px"
          text="Fusy po kawie/herbacie"
        />
        <Hint
          icon={<IoMdPaper size={60} />}
          mb="20px"
          text="Tektura, czysty nie zapisany papier lub np. ręczniki papierowe"
        />
      </>
    ),
    isEven: false,
  },
  {
    title: 'Codzienne odpady NIE nadające się do kompostowania:',
    content: (
      <>
        <Hint
          icon={<TbToolsKitchen size={60} />}
          mb="20px"
          text="Zepsuta żywność"
        />
        <Hint
          icon={<SlChemistry size={60} />}
          mb="20px"
          text="Odpady pochodzenia roślinnego, które mogą być skażone, np. chwasty
            środkami ochrony roślin lub skórki z owoców cytrusowych, które
            zawierają konserwanty"
        />
        <Hint
          icon={<AiOutlineBug size={60} />}
          mb="20px"
          text="Części chorych roślin lub rośliny zaatakowanych przez pasożyty
            (zarodniki grzybów lub jaja pasożytów, które mogą przetrwać proces
            kompostowania i zostać ponownie wprowadzone do gleby"
        />
        <Hint
          icon={<FaSeedling size={60} />}
          mb="20px"
          text="Chwasty, które stworzyły nasiona (nasiona przetrwają w kompoście i
            wykiełkują w glebie pokrytej kompostem"
        />
        <Hint
          icon={<BsTree size={60} />}
          mb="20px"
          text="Igły sosnowe – długo się rozkładają, wydłużając czas potrzebny do
            wytwarzania kompostu"
        />
        <Hint
          icon={<GiStonePile size={60} />}
          mb="20px"
          text="Gleby, żwir czy kamienie"
        />
        <Hint
          icon={<BiBone size={60} />}
          mb="20px"
          text="Odpady kuchenne, np. mięsa, kości, tłuszcz, nabiał lub całe jajeka,
            które mogą generować nieprzyjemny zapach"
        />
        <Hint
          icon={<BiBlanket size={60} />}
          mb="20px"
          text="Produkty plastikowe, metalowe, ceramiczne, szklane czy stworzone z
            tkanin"
        />
        <Hint
          icon={<FaDog size={60} />}
          mb="20px"
          text="Odchody zwierzęce, żwirek dla kotów (ze względów sanitarnych)."
        />
      </>
    ),
    isEven: true,
  },
];

export const InfoPage = () => {
  return (
    <Box>
      {contentSections.map((item) => (
        <Section
          title={item.title}
          content={item.content}
          isEven={item.isEven}
        />
      ))}
    </Box>
  );
};

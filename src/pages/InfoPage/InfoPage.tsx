import { Hint, Section, SectionProps } from '../../components';
import { Box } from '@chakra-ui/react';
import { BsTruck, TbChartBubble, TbPlant } from 'react-icons/all';

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
          text="Redukujemy ilość generowanych odpadów oraz koszty ich transportu a
            także zagospodarowania ich - aktywne wdrażanie zasady “zero waste”"
        />
        <Hint
          mt="20px"
          icon={<TbChartBubble size={70} />}
          text="Zmniejszamy ilość metanu powstającego na składowiskach w wyniku
            rozkładających się odpadów, który przyczynia się do globalnego
            ocieplenia uciekają do atmosfery"
        />
        <Hint
          mt="20px"
          icon={<TbPlant size={140} />}
          text="Pozwala nam to na uzyskanie naturalnego i darmowego nawozu, który
            jest bezpieczny dla ludzi i środowiska a także korzystanie z niego
            sprawia, że rośliny ogrodowe lepiej rosną, co zwiększa plony,
            ponadto kompost ogranicza rozwój chwastów i wspomaga glebę
            utrzymując wilgoć, pomagając w ten sposób przetrwać okresy suszy,
            które występują coraz częściej"
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
      <ol style={{ textAlign: 'left' }}>
        <li>Skoszona trawa, liście oraz zwiędłe rośliny</li>
        <li>
          Odpadki kuchenne pokroju obierek, pozostałości owoców i warzyw,
          skorupek jajek czy czerstwe pieczywo,
        </li>
        <li>Fusy po kawie/herbacie.</li>
        <li>Tektura, czysty nie zapisany papier lub np. ręczniki papierowe,</li>
      </ol>
    ),
    isEven: false,
  },
  {
    title: 'Codzienne odpady NIE nadające się do kompostowania:',
    content: (
      <ol style={{ textAlign: 'left' }}>
        <li>Zepsutege jedzenie</li>
        <li>
          Odpady pochodzenia roślinnego, które mogą być skażone, np. chwasty
          środkami ochrony roślin lub skórki z owoców cytrusowych, które
          zawierają konserwanty,
        </li>
        <li>
          Części chorych roślin lub rośliny zaatakowanych przez pasożyty
          (zarodniki grzybów lub jaja pasożytów, które mogą przetrwać proces
          kompostowania i zostać ponownie wprowadzone do gleby),
        </li>
        <li>
          Chwasty, które stworzyły nasiona (nasiona przetrwają w kompoście i
          wykiełkują w glebie pokrytej kompostem),
        </li>
        <li>
          Igły sosnowe – długo się rozkładają, wydłużając czas potrzebny do
          wytwarzania kompostu,
        </li>
        <li>Gleby, żwir czy kamienie</li>
        <li>
          Odpady kuchenne, np. mięsa, kości, tłuszcz, nabiał lub całe jajeka,
          które mogą generować nieprzyjemny zapach,
        </li>
        <li>
          Produkty plastikowe, metalowe, ceramiczne, szklane czy stworzone z
          tkanin.
        </li>
        <li>Odchody zwierzęce, żwirek dla kotów (ze względów sanitarnych).</li>
      </ol>
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

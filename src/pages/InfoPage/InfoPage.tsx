import { Section, SectionProps } from '../../components';
import { Box } from '@chakra-ui/react';

//TODO: Robert fill the sections with real content
const contentSections: Array<SectionProps> = [
  {
    title: 'Na czym polega kompostowanie?',
    content: (
      <>
        Kompostowanie to organiczny, najprostszy recykling. Bardzo pomocny w
        gospodarowaniu odpadami. Biomateriał wytworzony przez forę i faunę
        „powraca” jako cenny kompost. W naturze nic nie ginie. Najwięcej odpadów
        kompostuje się w Portugalii i Hiszpanii – ok. 17%., w Danii ok. 9% i
        Francji ok. 8%. W krajach tych wytwarzane komposty znajdują szerokie
        zastosowanie w produkcji winorośli, ogrodnictwie, warzywnictwie,
        produkcji rolnej i szkółkarskiej. Również duże ilości kompostów w
        kompostowniach przydomowych produkują rolnicy indywidualni w Austrii,
        wykorzystują go do celów nawozowych.
      </>
    ),
    isEven: true,
  },
  {
    title: 'Dlaczego robienie kompostu jest takie ważne?',
    content: (
      <>
        Kompostowanie pozwala nam dbać o środowisko, ponieważ:
        <ul>
          <li>
            Redukujemy ilość generowanych odpadów przez oraz koszty ich
            transportu a także zagospodarowania ich - aktywne wdrażanie zasady
            “zero waste”
          </li>
          <li>
            Zmniejszamy ilość metanu powstającego na składowiskach w wyniku
            rozkładających się odpadów, który przyczynia się do globalnego
            ocieplenia uciekają do atmosfery.
          </li>
          <li>
            pozwala nam to na uzyskanie naturalnego i darmowego nawozu, który
            jest bezpieczny dla ludzi i środowiska a także korzystanie z niego
            sprawia, że rośliny ogrodowe lepiej rosną, co zwiększa plony,
            ponadto kompost ogranicza rozwój chwastów i wspomaga glebę
            utrzymując wilgoć, pomagając w ten sposób przetrwać okresy suszy,
            które występują coraz częściej.
          </li>
        </ul>
      </>
    ),
    isEven: false,
  },
  {
    title: 'Czy robienie kompostu jest trudne?',
    content: (
      <>
        <p>
          wytwarzanie kompostu jest łatwe i nie wymaga specjalistycznej wiedzy,
          a założenie kompostownika możliwe jest nie tylko w ogrodzie, ale
          również w domu czy na balkonie. Kompostownik można zbudować
          samodzielnie lub zakupić gotową konstrukcję.
        </p>
        <p>
          Tworząc domowy kompostownik musimy zwrócić uwagę na to, co wkładamy do
          środka, aby finalny produkt nadawał się do użytku. Należy jednak
          podkreślić, że prawidłowo konserwowany kompostownik nie wydziela
          żadnego zapachu.
        </p>
      </>
    ),
    isEven: true,
  },
  {
    title: 'Co można wrzucać do kompostownika:',
    content: (
      <>
        <ul>
          <li>Skoszona trawa, liście,</li>
          <li>zwiędłe rośliny,</li>
          <li>czerstwe pieczywo,</li>
          <li>
            Odpadki kuchenne pokroju obierek, pozostałości owoców i warzyw,
            skorupek jajek,{' '}
          </li>
          <li>
            Czysty nie zapisany papier lub tektura np. ręczniki papierowe,
          </li>
          <li>fusy po kawie/herbacie.</li>
        </ul>
      </>
    ),
    isEven: false,
  },
  {
    title: 'Czego nie powinniśmy wrzucać do kompostownika:',
    content: (
      <>
        <ul>
          <li>zepsutego jedzenia</li>
          <li>
            odpady pochodzenia roślinnego, które mogą być skażone, np. chwasty
            środkami ochrony roślin lub skórki z owoców cytrusowych, które
            zawierają konserwanty,
          </li>
          <li>
            chwasty, które stworzyły nasiona (nasiona przetrwają w kompoście i
            wykiełkują w glebie pokrytej kompostem),
          </li>
          <li>
            Odpadków kuchennych pokroju mięsa, kości, tłuszczu, nabiału lub
            całych jajek, które mogą generować nieprzyjemny odór,
          </li>
          <li>
            Produktów plastikowych, metalowych, ceramicznych, szkła czy tkanin,
            które nie nadają do do kompostowania,
          </li>
          <li>
            części chorych roślin lub rośliny zaatakowanych przez pasożyty
            (zarodniki grzybów lub jaja pasożytów, które mogą przetrwać proces
            kompostowania i zostać ponownie wprowadzone do gleby),
          </li>
          <li>zepsute jedzenie</li>
          <li>gleby, żwiru, kamieni</li>
          <li>
            igły sosnowe – długo się rozkładają, wydłużając czas potrzebny do
            wytwarzania kompostu,
          </li>
          <li>
            odchodów zwierzęcych, żwirku dla kotów (ze względów sanitarnych).
          </li>
        </ul>
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

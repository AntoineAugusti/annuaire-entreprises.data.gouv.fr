import React from 'react';
import { IEtablissement, IUniteLegale } from '../../models';
import { formatDate, formatIntFr } from '../../utils/helpers/formatting';
import HorizontalSeparator from '../../components-ui/horizontal-separator';
import { Section } from '../section';
import { TwoColumnTable } from '../table/simple';
import { formatSiret } from '../../utils/helpers/siren-and-siret';
import { EAdministration } from '../../models/administration';
import AvisSituationLink from '../avis-situation-link';
import { EtablissementDescription } from '../etablissement-description';
import BreakPageForPrint from '../../components-ui/print-break-page';
import { PrintNever } from '../../components-ui/print-visibility';

interface IProps {
  etablissement: IEtablissement;
  uniteLegale: IUniteLegale;
  usedInEntreprisePage?: Boolean;
  withDenomination?: Boolean;
}

const EtablissementSection: React.FC<IProps> = ({
  etablissement,
  uniteLegale,
  usedInEntreprisePage,
  withDenomination,
}) => {
  const data = [
    ['Adresse', etablissement.adresse],
    [
      '',
      <PrintNever key="adresse-link">
        <a href={`/carte/${etablissement.siret}`}>→ voir sur la carte</a>
        <br />
        <br />
      </PrintNever>,
    ],
    ['SIRET', formatSiret(etablissement.siret)],
    ['Clef NIC', etablissement.nic],
    ['N° TVA Intracommunautaire', formatIntFr(uniteLegale.numeroTva)],
    [
      'Activité principale de l’entité (NAF/APE)',
      uniteLegale.libelleActivitePrincipale,
    ],
    [
      'Activité principale de l’établissement (NAF/APE)',
      etablissement.libelleActivitePrincipale,
    ],
    ['Nature juridique', uniteLegale.libelleNatureJuridique],
    ['Tranche d’effectif salarié', etablissement.libelleTrancheEffectif],
    ['Date de création', formatDate(etablissement.dateCreation)],
    [
      'Date de dernière mise à jour',
      formatDate(etablissement.dateDerniereMiseAJour),
    ],
    [
      'Avis de situation Insee',
      // eslint-disable-next-line
      <AvisSituationLink siret={etablissement.siret} />,
    ],
  ];

  if (etablissement.estActif === false) {
    data.push([
      'Date de fermeture',
      formatDate(etablissement.dateFermeture || ''),
    ]);
  }
  if (etablissement.enseigne) {
    data.splice(0, 0, ['Enseigne de l’établissement', etablissement.enseigne]);
  }
  if (etablissement.denomination) {
    data.splice(0, 0, ['Nom de l’établissement', etablissement.denomination]);
  }
  if (withDenomination) {
    data.splice(0, 0, ['Dénomination de l’entité', uniteLegale.nomComplet]);
    data.splice(0, 0, [
      'Type d’établissement',
      <>
        {etablissement.estSiege
          ? 'Siège social'
          : uniteLegale.allSiegesSiret.indexOf(etablissement.siret) > -1
          ? 'Ancien siège social'
          : 'Secondaire'}
        {' ( '}
        <a key="entite" href={`/entreprise/${uniteLegale.siren}`}>
          → voir la page de l’entité
        </a>
        {' )'}
      </>,
    ]);
  }

  return (
    <>
      {!usedInEntreprisePage && (
        <EtablissementDescription
          etablissement={etablissement}
          uniteLegale={uniteLegale}
        />
      )}
      <Section
        title={
          usedInEntreprisePage
            ? `Siège social`
            : `Établissement${etablissement.estSiege ? ' (siège social)' : ''}`
        }
        id="etablissement"
        source={EAdministration.INSEE}
      >
        <TwoColumnTable body={data} />
        <p className="faq-entrepreneur-individuels">
          <br />
          <i>
            Pour en savoir plus sur l’affichage des adresses{' '}
            <a href="/faq">consultez notre FAQ</a>
          </i>
        </p>
      </Section>
      <HorizontalSeparator />
      <BreakPageForPrint />
      <style jsx>{`
        .section-wrapper {
          display: flex;
          flex-direction: row;
        }

        .faq-entrepreneur-individuels {
          margin: 10px;
          font-size: 0.9rem;
        }

        @media only screen and (min-width: 1px) and (max-width: 600px) {
          .section-wrapper {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};
export default EtablissementSection;

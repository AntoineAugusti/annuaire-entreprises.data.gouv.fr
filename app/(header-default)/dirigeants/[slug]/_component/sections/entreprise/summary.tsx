import { HttpNotFound } from '#clients/exceptions';
import { Icon } from '#components-ui/icon/wrapper';
import { Loader } from '#components-ui/loader';
import { INPI, INSEE, MI } from '#components/administrations';
import { isAPINotResponding } from '#models/api-not-responding';
import { IUniteLegale } from '#models/core/types';
import { hasAnyError, isDataLoading } from '#models/data-fetching';
import { useTimeout } from 'hooks';
import { IDirigeantsFetching } from '.';

const NoDirigeantAssociation = ({ idAssociation = '' }) => (
  <>
    <p>
      Cette association n’a pas de dirigeant(e) enregistré(e) auprès de l’
      <INSEE /> ou auprès de l’
      <INPI />
    </p>
    <p>
      Si des dirigeants ont été déclarés auprès du <MI /> vous les retrouverez
      sur l&apos;onglet “personnes physiques“ de{' '}
      <a
        target="_blank"
        href={`https://www.data-asso.fr/annuaire/association/${idAssociation}?docFields=documentsDac,documentsRna`}
        rel="noopener noreferrer"
      >
        sa fiche data-asso
      </a>
      .
    </p>
  </>
);

const NoDirigeantDefault = () => (
  <p>
    Cette structure n’a pas de dirigeant(e) enregistré(e), que ce soit auprès de
    l’
    <INSEE /> ou auprès de l’
    <INPI />.
  </p>
);

type IDirigeantSummaryProps = {
  dirigeants: IDirigeantsFetching;
  uniteLegale: IUniteLegale;
};

const DirigeantSummary: React.FC<IDirigeantSummaryProps> = ({
  uniteLegale,
  dirigeants,
}) => {
  const summaries = [];
  const after100ms = useTimeout(100);
  if (isDataLoading(dirigeants)) {
    if (!after100ms) {
      return null;
    }
    summaries.push(
      <span>
        chargement des données des dirigeants en cours <Loader />
      </span>
    );
  } else {
    if (!hasAnyError(dirigeants)) {
      const dirigeantsCount = (dirigeants.data || []).length;
      summaries.push(
        <a href="#rne-dirigeants">
          {dirigeantsCount} dirigeants inscrits au Registre National des
          Entreprises (RNE)
        </a>
      );

      const beneficiairesCount = 0;
      summaries.push(
        <a href="#beneficiaires">
          <Icon slug="alertFill" color="#ff9c00">
            {beneficiairesCount} bénéficiaires inscrits à Référentiel des
            Bénéficiaires Effectifs
          </Icon>
        </a>
      );
    }
  }

  const hasNoDirigeant = summaries.length === 0;
  if (hasNoDirigeant) {
    if (uniteLegale.association.idAssociation) {
      return (
        <NoDirigeantAssociation
          idAssociation={uniteLegale.association.idAssociation}
        />
      );
    } else if (
      isAPINotResponding(dirigeants) &&
      !(dirigeants instanceof HttpNotFound)
    ) {
      return null;
    }
    return <NoDirigeantDefault />;
  }

  return (
    <nav role="navigation" aria-labelledby="dirigeant-summary-title">
      <strong id="dirigeant-summary-title">
        Cette structure a pour dirigeant(s) :
      </strong>
      <ul>
        {summaries.map((summary, index) => (
          <li key={index}>{summary}</li>
        ))}
      </ul>
      <br />
    </nav>
  );
};

export default DirigeantSummary;

import { GetServerSideProps } from 'next';
import React from 'react';
import BreakPageForPrint from '#components-ui/print-break-page';
import BeneficiairesSection from '#components/dirigeants-section/beneficiaires';
import DirigeantsEntrepriseIndividuelleSection from '#components/dirigeants-section/insee-dirigeant';
import DirigeantsSection from '#components/dirigeants-section/rncs-dirigeants';
import DirigeantSummary from '#components/dirigeants-section/summary';
import Meta from '#components/meta';
import { DirigeantsNonDiffusibleSection } from '#components/non-diffusible';
import { Section } from '#components/section';
import Title, { FICHE } from '#components/title-section';
import { EAdministration } from '#models/administrations';
import {
  getDirigeantsWithUniteLegaleFromSlug,
  IDirigeants,
} from '#models/dirigeants';
import { estDiffusible } from '#models/statut-diffusion';
import {
  getCompanyPageDescription,
  getCompanyPageTitle,
} from '#utils/helpers/get-company-page-title';
import extractParamsFromContext from '#utils/server-side-props-helper/extract-params-from-context';
import {
  IPropsWithMetadata,
  postServerSideProps,
} from '#utils/server-side-props-helper/post-server-side-props';
import { NextPageWithLayout } from 'pages/_app';

interface IProps extends IPropsWithMetadata, IDirigeants {}

const DirigeantsPage: NextPageWithLayout<IProps> = ({
  uniteLegale,
  immatriculationRNCS,
  metadata: { session },
}) => {
  return (
    <>
      <Meta
        canonical={`https://annuaire-entreprises.data.gouv.fr/dirigeants/${uniteLegale.siren}`}
        noIndex={true}
        title={`Dirigeants de la structure - ${getCompanyPageTitle(
          uniteLegale
        )}`}
        description={getCompanyPageDescription(uniteLegale)}
      />
      <div className="content-container">
        <Title
          uniteLegale={uniteLegale}
          ficheType={FICHE.DIRIGEANTS}
          session={session}
        />
        <>
          <DirigeantSummary
            uniteLegale={uniteLegale}
            immatriculationRNCS={immatriculationRNCS}
          />
          {estDiffusible(uniteLegale) ? (
            <>
              {uniteLegale.complements.estEntrepreneurIndividuel &&
                uniteLegale.dirigeant && (
                  <>
                    <DirigeantsEntrepriseIndividuelleSection
                      dirigeant={uniteLegale.dirigeant}
                    />
                    <BreakPageForPrint />
                  </>
                )}

              <DirigeantsSection
                immatriculationRNCS={immatriculationRNCS}
                siren={uniteLegale.siren}
              />
              <BreakPageForPrint />
              <BeneficiairesSection
                immatriculationRNCS={immatriculationRNCS}
                siren={uniteLegale.siren}
              />
            </>
          ) : (
            <DirigeantsNonDiffusibleSection />
          )}
        </>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = postServerSideProps(
  async (context) => {
    const { slug } = extractParamsFromContext(context);
    return {
      props: await getDirigeantsWithUniteLegaleFromSlug(slug),
    };
  }
);

export default DirigeantsPage;

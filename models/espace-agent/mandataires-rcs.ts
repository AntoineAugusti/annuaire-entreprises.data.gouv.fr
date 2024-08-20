import { clientApiEntrepriseMandatairesRCS } from '#clients/api-entreprise/mandataires-rcs';
import { EAdministration } from '#models/administrations/EAdministration';
import {
  APINotRespondingFactory,
  IAPINotRespondingError,
} from '#models/api-not-responding';
import { IDirigeants } from '#models/immatriculation';
import { verifySiren } from '#utils/helpers';
import { handleApiEntrepriseError } from './utils';

export const getMandatairesRCS = async (
  maybeSiren: string
): Promise<IDirigeants | IAPINotRespondingError> => {
  const siren = verifySiren(maybeSiren);
  try {
    const mandatairesRCS = await clientApiEntrepriseMandatairesRCS(siren);
    if (mandatairesRCS.length === 0) {
      return APINotRespondingFactory(EAdministration.INFOGREFFE, 404);
    }
    return { data: mandatairesRCS };
  } catch (error) {
    return handleApiEntrepriseError(error, {
      siren,
      apiResource: 'MadatairesRCS',
    });
  }
};

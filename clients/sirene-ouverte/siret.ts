import { IEtablissement } from '../../models';
import { verifySiren, verifySiret } from '../../utils/helpers/siren-and-siret';
import {
  formatAdresse,
  libelleFromCodeEffectif,
  libelleFromCodeNaf,
} from '../../utils/labels';
import { httpGet } from '../../utils/network/http';
import { HttpNotFound } from '../exceptions';
import routes from '../routes';

interface ISireneOuverteEtablissementResponse {
  etablissement: ISireneOuverteEtablissement[];
}
export interface ISireneOuverteEtablissement {
  enseigne?: string;
  siren: string;
  siret: string;
  nic: string;
  etat_administratif_etablissement: 'A' | null;
  date_creation: string;
  geo_adresse: string;
  etablissement_siege: string;
  activite_principale: string;
  date_mise_a_jour: string;
  date_debut_activite: string;
  libelle_activite_principale: string;
  is_siege: boolean;
  tranche_effectif_salarie: string;
  latitude: string;
  longitude: string;
  numero_voie: string;
  indice_repetition: string;
  type_voie: string;
  libelle_commune: string;
  code_postal: string;
  libelle_voie: string;
}

/**
 * GET ETABLISSEMENT
 */

const getEtablissementSireneOuverte = async (
  siret: string
): Promise<IEtablissement> => {
  const route = `${routes.sireneOuverte.etablissement}${encodeURI(siret)}`;
  const response = await httpGet(route);

  let etablissement;

  try {
    // Sirene ouverte does not return actual 404, just empty objects/arrays
    const result = response.data[0] as ISireneOuverteEtablissementResponse;

    etablissement = result.etablissement[0];
    if (!etablissement) {
      throw new HttpNotFound(404, 'Not Found');
    }
  } catch (e) {
    throw new HttpNotFound(404, 'Not Found');
  }

  return mapSireneOuverteEtablissementToDomainObject(etablissement);
};

export const mapSireneOuverteEtablissementToDomainObject = (
  etablissement: ISireneOuverteEtablissement
): IEtablissement => {
  const estActif = etablissement.etat_administratif_etablissement === 'A';
  return {
    enseigne: etablissement.enseigne || null,
    siren: verifySiren(etablissement.siren),
    siret: verifySiret(etablissement.siret),
    nic: etablissement.nic,
    estActif,
    estSiege: etablissement.is_siege,
    estDiffusible: true,
    dateCreation: etablissement.date_creation,
    dateDerniereMiseAJour: etablissement.date_mise_a_jour,
    dateDebutActivite: etablissement.date_debut_activite,
    dateFermeture: !estActif ? etablissement.date_debut_activite : null,
    adresse: formatAdresse(
      etablissement.numero_voie,
      etablissement.indice_repetition,
      etablissement.type_voie,
      etablissement.libelle_voie,
      etablissement.code_postal,
      etablissement.libelle_commune
    ),
    activitePrincipale: etablissement.activite_principale,
    libelleActivitePrincipale: libelleFromCodeNaf(
      etablissement.activite_principale
    ),
    trancheEffectif: etablissement.tranche_effectif_salarie,
    libelleTrancheEffectif: libelleFromCodeEffectif(
      etablissement.tranche_effectif_salarie
    ),
    latitude: etablissement.latitude,
    longitude: etablissement.longitude,
  };
};

export { getEtablissementSireneOuverte };

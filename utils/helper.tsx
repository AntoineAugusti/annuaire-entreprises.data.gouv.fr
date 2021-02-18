import { concatNames } from './formatting';
import { categoriesJuridiques } from './categories-juridiques';
import { codesNaf } from './codes-NAF';
import { codesEffectifs } from './code-effectifs';

export const managingDirector = (uniteLegale: any) => {
  return concatNames(uniteLegale.prenom_1, uniteLegale.nom);
};

export const libelleFromCodeNaf = (codeNaf: string) => {
  const formattedNaf = (codeNaf || '').replace(/[.-]/g, '');
  //@ts-ignore
  return codesNaf[formattedNaf] || 'Activité inconnue';
};
export const libelleFromCodeEffectif = (codeEffectif: string) => {
  //@ts-ignore
  return codesEffectifs[codeEffectif] || null;
};

export const fullLibelleFromCodeNaf = (activite_principale: string) =>
  activite_principale
    ? `${activite_principale} - ${libelleFromCodeNaf(activite_principale)}`
    : '';

export const libelleFromCategoriesJuridiques = (categorie: string) =>
  //@ts-ignore
  categorie ? categoriesJuridiques[categorie] : '';

export const fullAdress = (etablissement: any) => {
  if (
    !etablissement.libelle_commune &&
    !etablissement.geo_l4 &&
    !etablissement.code_postal
  ) {
    return 'Adresse inconnue';
  }

  const adresse = `${etablissement.geo_l4 || ''} ${
    etablissement.code_postal || ''
  } ${etablissement.libelle_commune || ''}`;

  return adresse || 'Adresse inconnue';
};

export const isSirenOrSiret = (str: string) => {
  return (
    str.match(/^\d{9}|\d{14}$/g) && (str.length === 9 || str.length === 14)
  );
};

export const isSiret = (str: string) => {
  return str.match(/^\d{14}$/g) && str.length === 14;
};

export const isSiren = (str: string) => {
  return str.match(/^\d{9}$/g) && str.length === 9;
};

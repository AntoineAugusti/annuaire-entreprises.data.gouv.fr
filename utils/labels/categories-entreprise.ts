export const categoriesEntreprise = (code: string) => {
  if (code === 'GE') {
    return 'Grande Entreprise';
  } else if (code === 'PME') {
    return 'Petite ou Moyenne Entreprise';
  } else if (code === 'ETI') {
    return 'Entreprise de Taille Intermédiaire';
  }
  return null;
};

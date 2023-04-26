import TextWrapper from '#components-ui/text-wrapper';
import Meta from '#components/meta';
import { NextPageWithLayout } from './_app';

const team = [
  {
    photoUrl: '/images/team/xavier.jpg',
    fullname: 'Xavier Jouppe',
    role: 'Intrapreneur',
  },
  {
    photoUrl: '/images/team/hajar.jpg',
    fullname: 'Hajar AIT EL KADI',
    role: 'Data engineer',
  },
  {
    photoUrl: '/images/team/yoan.jpg',
    fullname: 'Yoan Ficadiere',
    role: 'Développeur',
  },
  {
    photoUrl: '/images/team/jonathan.jpg',
    fullname: 'Jonathan Louis',
    role: 'Chargé de déploiement SEO',
  },
  {
    photoUrl: '/images/team/karen.jpg',
    fullname: 'Karen Mazmanian',
    role: 'Chargé de déploiement et de communication',
  },
  {
    photoUrl: '/images/team/anais.jpg',
    fullname: 'Anais Tailhade',
    role: 'Responsable du support utilisateur',
  },
  {
    photoUrl: '/images/team/jeremie.jpg',
    fullname: 'Jérémie Cook',
    role: 'UX Designer',
  },
];

const Equipe: NextPageWithLayout = () => {
  return (
    <div>
      <Meta noIndex title="Équipe de l'Annuaire des Entreprises"></Meta>
      <TextWrapper>
        <h1>Qui sommes-nous ?</h1>
        <h2>Qui construit l’Annuaire des Entreprises ?</h2>
        <p>
          Ce site public est développé et maintenu par la Direction
          interministérielle du numérique{' '}
          <a
            href="https://www.numerique.gouv.fr/dinum/"
            target="_blank"
            rel="noreferrer"
          >
            (DINUM)
          </a>
          , en coopération avec la{' '}
          <a
            href="https://entreprises.gouv.fr/"
            target="_blank"
            rel="noreferrer"
          >
            Direction Générale des Entreprises (DGE)
          </a>{' '}
          et les{' '}
          <a href="/donnees/sources">
            administrations qui fournissent la donnée
          </a>
          .
        </p>

        <h2>Notre méthode</h2>
        <p>
          L’Annuaire des Entreprises est un site de l’Etat qui s’inspire des{' '}
          <a href="https://beta.gouv.fr/manifeste">méthodes agiles</a>{' '}
          développées au sein de <a href="https://beta.gouv.fr/">beta.gouv</a>.
        </p>

        <p>
          Nous testons donc en permanence de nouvelles fonctionnalités. Si elles
          ne correspondent pas aux attentes des utilisateurs, elles peuvent être
          modifiées ou même supprimées. C’est une logique d’amélioration qui
          accepte l’erreur comme une tentative et non comme une fatalité.
        </p>

        <h2>Nos objectifs</h2>

        <ul>
          <li>
            Simplifier les démarches administratives (pour les entreprises et
            les agents publics)
          </li>
          <li>
            Améliorer la fiabilité des informations légales des entreprises,
            associations et administrations
          </li>
          <li>Informer sur les données affichées</li>
          <li>
            Mettre en cohérence les différentes données publiques, actuellement
            dispersées au sein des administrations françaises
          </li>
          <li>
            Participer à une meilleure transparence de l’information publique
            ouverte (logique d’open data, de données ouvertes)
          </li>
        </ul>

        <h2>Ce que nous ne faisons pas</h2>
        <ul>
          <li>
            Proposer des outils d’intelligence économique (surveillance, alerte
            mail, enrichissement de CRM)
          </li>
          <li>
            Effectuer une correction sur une informations affichée (pour une
            entreprise, consultez{' '}
            <a href="https://formalites.entreprises.gouv.fr">
              le site de formalités des entreprises de l’INPI
            </a>
            , pour une association consultez{' '}
            <a href="https://lecompteasso.associations.gouv.fr/">
              Le Compte Asso
            </a>
            )
          </li>
          <li>Informer sur des informations non affichées</li>
        </ul>

        <h2>La fine équipe</h2>

        <p>Notre équipe est constituée de :</p>

        <ul>
          <li>un intrapreneur chargé de piloter le projet</li>
          <li>un développeur</li>
          <li>une data engineer</li>
          <li>deux chargés de déploiement et de communication</li>
          <li>une responsable de support</li>
          <li>un UX designer</li>
        </ul>
        <p>
          Plus d’informations{' '}
          <a href="https://beta.gouv.fr/startups/annuaire-entreprises.html">
            sur la page beta.gouv du projet
          </a>
          .
        </p>
        <div className="team-members">
          {team.map((member) => (
            <div className="team-member" key={member.fullname}>
              <img
                src={member.photoUrl}
                alt={`Photo de ${member.fullname} - ${member.role}`}
                title={`Photo de ${member.fullname} - ${member.role}`}
              />
            </div>
          ))}
        </div>
      </TextWrapper>
      <style jsx>{`
        .team-members {
          margin: 60px auto;
          display: flex;
          justify-content: center;
          width: 100%;
          flex-wrap: wrap;
        }

        .team-member {
          text-align: center;
          width: 80px;
        }

        .team-member img {
          width: 100px;
          border-radius: 50%;
          border: 5px solid #fff;
        }
      `}</style>
    </div>
  );
};

export default Equipe;

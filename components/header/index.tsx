import React from 'react';
import { Icon } from '#components-ui/icon/wrapper';
import Logo from '#components-ui/logo';
import { PrintNever } from '#components-ui/print-visibility';
import { AdvancedSearch } from '#components/advanced-search';
import SearchBar from '#components/search-bar';
import constants from '#models/constants';
import { IParams } from '#models/search-filter-params';
import { ISession, isLoggedIn } from '#utils/session';

interface IProps {
  currentSearchTerm?: string;
  useMap?: boolean;
  searchParams?: IParams;
  useAdvancedSearch?: boolean;
  useLogo?: boolean;
  useSearchBar?: boolean;
  session?: ISession | null;
}

export const Header: React.FC<IProps> = ({
  currentSearchTerm = '',
  searchParams = {},
  useMap = false,
  useLogo = false,
  useAdvancedSearch = false,
  useSearchBar = false,
  session = null,
}) => (
  <>
    <header role="banner" className="fr-header">
      <div
        id="loader-bar"
        style={{
          background: isLoggedIn(session)
            ? constants.colors.espaceAgent
            : 'transparent',
        }}
      />
      <PrintNever>
        <form
          id="search-bar-form"
          action={useMap ? '/rechercher/carte' : '/rechercher'}
          method="get"
        >
          <div className="fr-header__body">
            <div className="fr-container">
              <div className="fr-header__body-row">
                <div className="fr-header__brand">
                  <div className="fr-header__brand-top">
                    <div className="fr-header__logo">
                      <a href="/" title="République française">
                        <p className="fr-logo">
                          République
                          <br />
                          française
                        </p>
                      </a>
                    </div>
                    {useSearchBar || useLogo ? (
                      <div className="annuaire-logo">
                        <a href="/" title="L’Annuaire des Entreprises">
                          <Logo
                            title="Logo de l’Annuaire des Entreprises"
                            slug="annuaire-entreprises"
                            width={140}
                            height={54}
                          />
                        </a>
                      </div>
                    ) : null}
                    <div className="fr-header__navbar"></div>
                  </div>
                  {useSearchBar ? (
                    <div className="not-fr-search">
                      <SearchBar defaultValue={currentSearchTerm} />
                    </div>
                  ) : null}
                </div>
                <div className="fr-header__tools">
                  <div className="fr-header__tools-links">
                    {isLoggedIn(session) ? (
                      <ul className="fr-links-group">
                        <li>
                          <a
                            className="fr-link"
                            href="/api/auth/mon-compte-pro/logout"
                          >
                            <div
                              style={{
                                fontVariant: 'small-caps',
                                color: constants.colors.espaceAgent,
                              }}
                            >
                              <b>agent public</b>
                            </div>
                            <Icon slug="user">
                              Se déconnecter (
                              {session?.user?.email || 'Utilisateur inconnu'})
                            </Icon>
                          </a>
                        </li>
                      </ul>
                    ) : (
                      <ul className="fr-links-group">
                        <li>
                          <a className="fr-link" href="/comment-ca-marche">
                            <Icon size={12} slug="information">
                              À propos
                            </Icon>
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {useAdvancedSearch ? (
            <AdvancedSearch
              searchParams={searchParams}
              currentSearchTerm={currentSearchTerm}
              isMap={useMap}
            />
          ) : null}
        </form>
      </PrintNever>
    </header>
    <style jsx>{`
      ${!useSearchBar
        ? `header.fr-header, div.fr-header__brand {
        filter: none !important;
      }`
        : ''}

      div.annuaire-logo {
        order: 2;
        margin-right: 15px;
      }

      .not-fr-search {
        width: 470px;
        max-width: 100%;
        flex-grow: 1;
      }

      div.with-session-banner {
        background-color: ${constants.colors.espaceAgent};
        color: #fff;
        font-size: 2rem;
        line-height: 3rem;
      }

      #loader-bar {
        transition: width 150ms ease-in-out;
        width: 100%;
        height: 3px;
        top: 0;
        left: 0;
        z-index: 1000;
        position: absolute;
      }

      @media print {
        .fr-header {
          display: none !important;
        }
      }
      @media only screen and (min-width: 1px) and (max-width: 992px) {
        .not-fr-search {
          width: 100%;
          margin: 0.75rem;
          margin-top: 0;
        }
      }
    `}</style>
  </>
);

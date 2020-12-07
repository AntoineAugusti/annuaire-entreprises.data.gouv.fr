import React from 'react';

const Footer = () => (
  <>
    <div className="footer layout-center">
      <div>
        🇫🇷 ・ un service de l’Etat français ・{' '}
        <a
          href="https://etalab.gouv.fr"
          rel="noopener noreferrer"
          target="_blank"
        >
          réalisé par Etalab{' '}
        </a>
        &nbsp;et la&nbsp;
        <a
          href="https://entreprises.gouv.fr"
          rel="noopener noreferrer"
          target="_blank"
        >
          DGE
        </a>{' '}
        en 2020
      </div>
    </div>
    <style global jsx>{`
      .footer {
        border-top: 1px dashed #00009166;
        min-height: 60px;
        width: 100%;
        text-align: center;
        padding: 0 20px;
      }
      .footer > div {
        display: table-cell;
        vertical-align: middle;
      }
    `}</style>
  </>
);

export default Footer;

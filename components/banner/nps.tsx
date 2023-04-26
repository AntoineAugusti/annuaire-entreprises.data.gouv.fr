import React from 'react';
import { PrintNever } from '#components-ui/print-visibility';
import constants from '#models/constants';

export const NPSBanner: React.FC<{}> = () => (
  <PrintNever>
    <div id="nps-modal" role="dialog" aria-label="Donnez-nous votre avis">
      <div className="fr-container">
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <a onclick="window.closeModal('nps-modal')"  href="/formulaire/nps" target="_blank">
                👍👎 Quel est votre avis sur ce site ?
              </a>`,
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <button onclick="window.closeModal('nps-modal')" style="box-shadow:none;font-family: 'Marianne', sans-serif;padding: 0;outline: none;border: none;background-color: transparent;">
                <b>Ne plus afficher ce message ✕</b>
              </button>
        `,
          }}
        ></div>
      </div>
    </div>
    <style jsx>{`
      #nps-modal {
        display: none;
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 0.9rem;
        width: 100%;
        background-color: #fffde6;
        font-family: 'Marianne', sans-serif;
        border-bottom: 2px solid ${constants.colors.frBlue};
      }
      #nps-modal .fr-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `}</style>
  </PrintNever>
);

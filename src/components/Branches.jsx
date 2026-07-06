import { useTranslation } from "react-i18next";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

import branches from "../data/branches";

function Branches() {
  const { t } = useTranslation();

  return (
    <section className="branches" id="branches">
      <h2>{t("branches.title")}</h2>

      <p className="branches-subtitle">{t("branches.subtitle")}</p>

      <div className="branches-grid">
        {Object.values(branches).map((branch) => (
          <div className="branch-card" key={branch.id}>
            <h3>{branch.name}</h3>

            <p>
              <FaMapMarkerAlt /> {branch.address}
            </p>

            <p>
              <FaPhoneAlt /> {branch.phone}
            </p>

            <p>
              <FaClock /> {branch.openingText}
            </p>

            <div className="branch-buttons">
              <a
                href={branch.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn"
              >
                📍 {t("branches.maps")}
              </a>

              <a
                href={`tel:${branch.phone.replace(/\s/g, "")}`}
                className="hero-btn-outline"
              >
                📞 {t("branches.call")}
              </a>
            </div>

            <div className="branch-social">
              {branch.instagram && (
                <a
                  href={branch.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              )}

              {branch.facebook && (
                <a
                  href={branch.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Branches;
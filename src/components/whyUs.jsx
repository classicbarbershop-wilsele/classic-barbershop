import { useTranslation } from "react-i18next";

function WhyUs() {
  const { t } = useTranslation();

  const features = [
    {
      icon: "💈",
      title: t("whyUs.professionalTitle"),
      text: t("whyUs.professionalText"),
    },
    {
      icon: "⭐",
      title: t("whyUs.premiumTitle"),
      text: t("whyUs.premiumText"),
    },
    {
      icon: "📍",
      title: t("whyUs.branchesTitle"),
      text: t("whyUs.branchesText"),
    },
    {
      icon: "⏰",
      title: t("whyUs.hoursTitle"),
      text: t("whyUs.hoursText"),
    },
    {
      icon: "📅",
      title: t("whyUs.onlineTitle"),
      text: t("whyUs.onlineText"),
    },
    {
      icon: "💎",
      title: t("whyUs.qualityTitle"),
      text: t("whyUs.qualityText"),
    },
  ];

  return (
    <section className="why-us">
      <h2>{t("whyUs.title")}</h2>

      <p className="why-subtitle">
        {t("whyUs.subtitle")}
      </p>

      <div className="why-grid">
        {features.map((feature) => (
          <div className="why-card" key={feature.title}>
            <h3>
              {feature.icon} {feature.title}
            </h3>

            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyUs;
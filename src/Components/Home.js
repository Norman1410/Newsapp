import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation(); // Se obtiene la función de traducción

  console.log("Traducción cargada:", t("news_main_screen"));

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">{t("news_main_screen")}</h1>
    </div>
  );
};

export default Home;

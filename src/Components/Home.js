import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation(); // Se obtiene la función de traducción

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">{t("main_screen")}</h1>
    </div>
  );
};

export default Home;

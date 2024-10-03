import { SeatingConfigurator } from "../Configurator";

export default function Home() {
  const seating = {
    option1OptionsCollection: [{ value: "blue" }],
    sofa: {
      option2OptionsCollection: [{ value: "leather" }],
    },
  };
  const config = {
    priceUsd: 1000,
    variantId: "1234",
  };
  const price = { value: 500 };
  const colorsData: { value: string; title: string }[] = [
    { value: "red", title: "Red" },
    { value: "blue", title: "Blue" },
    { value: "green", title: "Green" },
  ];
  const configId = "1234";
  return (
    <>
      <SeatingConfigurator
        collectionTitle="Sofas"
        seating={seating}
        config={config}
        price={price}
        colorsData={colorsData}
        configId={configId}
      />
    </>
  );
}

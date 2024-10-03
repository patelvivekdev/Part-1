import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  SeatingWrapper,
  AddToCartButton,
  AddToCartContainer,
  ErrorMessage,
  Loader,
} from "./styles";
import { useCartMutation } from "../hooks/useCartMutation";
import { calculateCozeyCarePrice } from "../helpers/calculateCozeyCarePrice";
import ColorSelector from "../Common/ColorSelector";
import { useAdditionalConfig } from "../hooks/useAdditionalConfig";
import SeatSelector from "../Common/SeatSelector";

export const SeatingConfigurator = ({
  seating,
  config,
  price,
  colorsData,
  configId,
}: any) => {
  const router = useRouter();

  const [color, setColor] = useState<string | undefined>(undefined);
  const [seat, setSeat] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { addToCart } = useCartMutation();

  // custom hook for fetching additional Config
  const {
    data: additionalConfig,
    isLoading,
    error,
  } = useAdditionalConfig(configId);

  // Set initial data into state
  useEffect(() => {
    if (seating) {
      setColor(seating.option1OptionsCollection[0]?.value);
      setSeat(seating.sofa.option2OptionsCollection[0].value);
    }
  }, [seating]);

  const totalPrice = useMemo(() => {
    return price.value + calculateCozeyCarePrice(config.priceUsd);
  }, [price, config]);

  const memoizedSeats = useMemo(
    () => additionalConfig?.seatingOptions || [],
    [additionalConfig]
  );
  const memoizedColors = useMemo(() => colorsData || [], [colorsData]);

  const handleAddToCart = async () => {
    if (!color || !seat) {
      setErrorMessage("Please select both a color and a seating option");
      return;
    }

    setErrorMessage(null);
    try {
      await addToCart({
        quantity: 1,
        variantId: config.variantId,
        options: {
          color: color,
          seating: seat,
        },
      });
      // router.push("/cart");
    } catch (error) {
      setErrorMessage("Error adding item to cart - please try again");
    }
  };

  // Early return if loading or error
  if (isLoading) {
    return <Loader>Loading configurations...</Loader>;
  }

  if (error || !additionalConfig?.seatingOptions) {
    return <ErrorMessage>{error || "No configurations found"}</ErrorMessage>;
  }

  return (
    <SeatingWrapper>
      <ColorSelector
        selectedColor={color}
        setColor={setColor}
        colors={memoizedColors}
      />
      {/* Custom component for selecting seating */}
      <SeatSelector
        selectedSeat={seat}
        setSeat={setSeat}
        seats={memoizedSeats}
      />
      <AddToCartContainer>
        <AddToCartButton type="button" onClick={handleAddToCart}>
          Add to Cart - ${totalPrice}
        </AddToCartButton>
      </AddToCartContainer>
      {/*  Display error message if there is one */}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </SeatingWrapper>
  );
};

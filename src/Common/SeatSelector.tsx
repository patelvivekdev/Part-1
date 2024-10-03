import React, { memo } from "react";

const SeatSelector = memo(
  ({
    selectedSeat,
    setSeat,
    seats,
  }: {
    selectedSeat: string | undefined;
    setSeat: (seat: string) => void;
    seats: { value: string; title: string }[];
  }) => {
    console.log("seat changed");
    return (
      <div>
        <label>Select Seating Option</label>
        <select
          value={selectedSeat || ""}
          onChange={(e) => setSeat(e.target.value)}
        >
          {seats.map((seat) => (
            <option key={seat.value} value={seat.value}>
              {seat.title}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default SeatSelector;

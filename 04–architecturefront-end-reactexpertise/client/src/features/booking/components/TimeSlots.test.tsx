import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import TimeSlots from "./TimeSlots";

describe("TimeSlots", () => {
  it("appelle onSelectTime au clic", () => {
    const onSelectTime = vi.fn();

    render(
      <TimeSlots
        slots={["09:00", "10:00"]}
        selectedTime=""
        onSelectTime={onSelectTime}
      />
    );

    fireEvent.click(
      screen.getByText("10:00")
    );

    expect(
      onSelectTime
    ).toHaveBeenCalledWith("10:00");
  });
});
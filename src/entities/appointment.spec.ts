import { expect, test } from "vitest";
import { getFutureDate } from "../tests/utils/get-future-date";
import { Appointment } from "./appointment";

test("create an appointment", () => {
  const startAt = getFutureDate("2022-08-10");
  const endAt = getFutureDate("2022-08-11");

  const appointment = new Appointment({
    customer: "John Doe",
    startAt,
    endAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.custumer).toEqual("John Doe");
});

test("cannot create an appointment with end date before start date", () => {
  const startAt = getFutureDate("2022-08-10");
  const endAt = getFutureDate("2022-08-09");

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startAt,
      endAt,
    });
  }).toThrow();
});

test("cannot create an appointment with start date before now", () => {
  const startAt = new Date();
  const endAt = new Date();
  startAt.setDate(startAt.getDate() - 1);
  endAt.setDate(endAt.getDate() + 1);

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startAt,
      endAt,
    });
  }).toThrow();
});

import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentRepository } from "../repositories/in-memory/in-memory-appointments-repositories";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe("Create Appointment", () => {
  it("shpuld not be able to create an appointment with overlaping dates", async () => {
    const startAt = getFutureDate("2022-08-10");
    const endAt = getFutureDate("2022-08-15");
    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);
    await createAppointment.execute({
      customer: "John Doe",
      startAt,
      endAt,
    });
    // expect().resolves.toBeInstanceOf(Appointment);
    expect(
      createAppointment.execute({
        customer: "John Dow",
        startAt: getFutureDate("2022-08-14"),
        endAt: getFutureDate("2022-08-18"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Dow",
        startAt: getFutureDate("2022-08-09"),
        endAt: getFutureDate("2022-08-12"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Dow",
        startAt: getFutureDate("2022-08-08"),
        endAt: getFutureDate("2022-08-17"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Dow",
        startAt: getFutureDate("2022-08-14"),
        endAt: getFutureDate("2022-08-18"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "John Dow",
        startAt: getFutureDate("2022-08-11"),
        endAt: getFutureDate("2022-08-12"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});

import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointment-repositories";

interface CreateAppointmentRequest {
  customer: string;
  startAt: Date;
  endAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentsRepository) {}

  async execute({
    customer,
    startAt,
    endAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overLappingAppointment =
      await this.appointmentRepository.findOverLappingAppointment(
        startAt,
        endAt
      );

    if (overLappingAppointment) {
      throw new Error("Another appointment overlaps this appointment dates");
    }
    const appointment = new Appointment({
      customer,
      startAt,
      endAt,
    });

    await this.appointmentRepository.create(appointment);

    return appointment;
  }
}

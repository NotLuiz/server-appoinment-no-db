interface AppointmentProps {
  customer: string;
  startAt: Date;
  endAt: Date;
}

export class Appointment {
  private props: AppointmentProps;

  get custumer(): string {
    return this.props.customer;
  }

  get startAt(): Date {
    return this.props.startAt;
  }

  get endAt(): Date {
    return this.props.endAt;
  }

  constructor(props: AppointmentProps) {
    const { startAt, endAt } = props;

    if (startAt <= new Date()) {
      throw new Error("Invalide start Date");
    }

    if (endAt <= startAt) {
      throw new Error("Invalide end Date");
    }

    this.props = props;
  }
}

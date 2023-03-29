import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { AppError } from "../../errors";
import { ICreateSchedule } from "../../interfaces/schedules.interfaces";
import { RealEstate, Schedule, User } from "../../entities";

const createSchedulesService = async (
  bodyData: ICreateSchedule,
  idUser: number,
  idRealEstate: number
): Promise<any> => {
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateExists: RealEstate | null =
    await realEstateRepository.findOneBy({
      id: idRealEstate,
    });
  if (!realEstateExists) {
    throw new AppError("RealEstate not found", 404);
  }

  const userExists: User | null = await userRepository.findOneBy({
    id: idUser,
  });

  if (!userExists) {
    throw new AppError("Invalid credentials", 401);
  }

  const scheduleExists = await scheduleRepository
    .createQueryBuilder("schedule")
    .leftJoinAndSelect("schedule.realEstate", "realEstate")
    .leftJoinAndSelect("schedule.user", "user")
    .where({
      date: bodyData.date,
      hour: bodyData.hour,
    })
    .getOne();

  if (scheduleExists?.user.id === idUser) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  if (scheduleExists?.realEstate.id === realEstateExists.id) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  if (
    Number(bodyData.hour[0]) === 2 ||
    Number(bodyData.hour[0] + bodyData.hour[1]) > 18 ||
    (Number(bodyData.hour[0] + bodyData.hour[1]) === 18 &&
      Number(bodyData.hour[4] + bodyData.hour[5]) > 0) ||
    Number(bodyData.hour[0] + bodyData.hour[1]) < 8
  ) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const dateString = bodyData.date;
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const { realEstateId, ...rest } = bodyData;
  const schedule: Schedule = scheduleRepository.create({
    ...rest,
    user: userExists,
    realEstate: realEstateExists,
  });

  await scheduleRepository.save(schedule);

  return { message: "Schedule created" };
};

export default createSchedulesService;

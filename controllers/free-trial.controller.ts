import { FreeTrial, FreeTrialRepository, User, UserRepository } from '@/repository';
import { NextResponse } from 'next/server';

class FreeTrialController {
  constructor(
    private readonly freeTrialRepository: FreeTrialRepository,
    private readonly userRepository: UserRepository
  ) {}

  async findOne({ params }: { params: { id: string } }) {
    const { id } = params;

    try {
      const freeTrialFromDB = await this.freeTrialRepository.findOne(id);

      if (!freeTrialFromDB) throw new Error('FreeTrial dont exist');

      return NextResponse.json(freeTrialFromDB);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: (error as Error).message }, { status: 404 });
    }
  }

  async create(userId: string) {
    try {
      const newFreeTrial = await this.freeTrialRepository.create({
        active: true,
        gen_count: 0,
        userId,
      });

      await this.userRepository.update(userId, {
        freeTrial: { connect: { id: newFreeTrial.id } },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(request: Request) {
    const { uid } = await request.json();

    try {
      let freeTrialFromDB = await this.freeTrialRepository.findById(uid);

      if (!freeTrialFromDB)
        return NextResponse.json(
          { message: 'Ya haz alcanzado el limite máximo de generación de imágenes' },
          { status: 404 }
        );

      freeTrialFromDB.gen_count === 4
        ? (freeTrialFromDB = await this.freeTrialRepository.update(freeTrialFromDB.id, {
            gen_count: freeTrialFromDB.gen_count + 1,
            active: false,
            endDate: new Date(),
          }))
        : (freeTrialFromDB = await this.freeTrialRepository.update(freeTrialFromDB.id, {
            gen_count: freeTrialFromDB.gen_count + 1,
          }));

      return NextResponse.json(freeTrialFromDB);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
  }
}

export const freeTrialController = new FreeTrialController(FreeTrial, User);

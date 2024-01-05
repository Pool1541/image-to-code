import { freeTrialController } from '@/controllers/free-trial.controller';

export async function POST(request: Request) {
  return freeTrialController.update(request);
}

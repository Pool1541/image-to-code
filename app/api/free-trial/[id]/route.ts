import { freeTrialController } from '@/controllers/free-trial.controller';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  return freeTrialController.findOne({ params });
}

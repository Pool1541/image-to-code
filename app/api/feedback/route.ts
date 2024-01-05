import { feedbackController } from '@/controllers/feedback.controller';

export async function POST(request: Request) {
  return feedbackController.create(request);
}
